// Thin fetch wrapper for the Companion REST API.
//
// Mirrors the existing cookie-based auth pattern (AuthContext, Subscription.jsx):
// every request is a plain fetch with `credentials: "include"`, so the HttpOnly
// auth cookie set at /callback sign-in is sent automatically and the backend's
// custom authorizer resolves the user. There is NO Authorization header.
//
// It parses the standard API envelope:
//   success (single):     { "data": { ... } }
//   success (collection): { "data": { "items": [...] }, "meta": { count, nextCursor } }
//   error:                { "error": { "code": "...", "message": "...", "details": {} } }
//
// On a non-2xx it throws an ApiError carrying the HTTP status + envelope code so
// the UI can cleanly distinguish 401 (not logged in) and 402 (subscription-gated)
// from generic / service-unavailable failures.

const API_BASE = `https://api.${import.meta.env.VITE_DOMAIN || "dev.versiful.io"}`;

export class ApiError extends Error {
    constructor(status, code, message, details) {
        super(message || `Request failed (${status})`);
        this.name = "ApiError";
        this.status = status;
        this.code = code || _codeForStatus(status);
        this.details = details || null;
    }

    get isUnauthorized() {
        return this.status === 401 || this.code === "unauthorized";
    }

    // 402 — subscription required OR free-tier limit reached (both gate on upgrade).
    get isSubscriptionRequired() {
        return (
            this.status === 402 ||
            this.code === "subscription_required" ||
            this.code === "limit_reached"
        );
    }

    get isServiceUnavailable() {
        return this.status === 503 || this.code === "service_unavailable";
    }

    get isNotFound() {
        return this.status === 404 || this.code === "not_found";
    }
}

function _codeForStatus(status) {
    switch (status) {
        case 401:
            return "unauthorized";
        case 402:
            return "subscription_required";
        case 404:
            return "not_found";
        case 422:
        case 400:
            return "validation_error";
        case 503:
            return "service_unavailable";
        case 0:
            return "network_error";
        default:
            return "internal_error";
    }
}

async function request(path, { method = "GET", body, query } = {}) {
    let url = `${API_BASE}${path}`;
    if (query && typeof query === "object") {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") params.append(k, v);
        });
        const qs = params.toString();
        if (qs) url += `?${qs}`;
    }

    const opts = { method, credentials: "include" };
    if (body !== undefined) {
        opts.headers = { "Content-Type": "application/json" };
        opts.body = JSON.stringify(body);
    }

    let resp;
    try {
        resp = await fetch(url, opts);
    } catch (e) {
        throw new ApiError(0, "network_error", "Network error — check your connection and try again.");
    }

    if (resp.status === 204) return null;

    let payload = null;
    const text = await resp.text();
    if (text) {
        try {
            payload = JSON.parse(text);
        } catch {
            payload = null;
        }
    }

    if (!resp.ok) {
        const err = (payload && payload.error) || {};
        // Some upstream/gateway errors return {"message": "..."} rather than the envelope.
        const message = err.message || (payload && payload.message) || `Request failed (${resp.status}).`;
        throw new ApiError(resp.status, err.code, message, err.details);
    }

    if (payload && Object.prototype.hasOwnProperty.call(payload, "data")) {
        return payload.data;
    }
    return payload;
}

// A variant that also returns envelope meta (count / nextCursor) for collections.
async function requestWithMeta(path, options) {
    let url = `${API_BASE}${path}`;
    const opts = { method: options?.method || "GET", credentials: "include" };
    if (options?.body !== undefined) {
        opts.headers = { "Content-Type": "application/json" };
        opts.body = JSON.stringify(options.body);
    }
    if (options?.query && typeof options.query === "object") {
        const params = new URLSearchParams();
        Object.entries(options.query).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") params.append(k, v);
        });
        const qs = params.toString();
        if (qs) url += `?${qs}`;
    }
    let resp;
    try {
        resp = await fetch(url, opts);
    } catch (e) {
        throw new ApiError(0, "network_error", "Network error — check your connection and try again.");
    }
    let payload = null;
    const txt = await resp.text();
    if (txt) {
        try {
            payload = JSON.parse(txt);
        } catch {
            payload = null;
        }
    }
    if (!resp.ok) {
        const err = (payload && payload.error) || {};
        const message = err.message || (payload && payload.message) || `Request failed (${resp.status}).`;
        throw new ApiError(resp.status, err.code, message, err.details);
    }
    return { data: payload?.data ?? payload, meta: payload?.meta ?? null };
}

// Collections come back as { data: { items: [...] } }; normalize to a plain array.
const itemsOf = (data) => (Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : []);

export const companionApi = {
    // --- Daily verse (§6) — premium (402 for free) ---
    getDailyVerse: () => request("/daily-verse"),

    // --- Prayers (§7) ---
    listPrayers: async () => itemsOf(await request("/prayers")),
    createPrayer: (data) => request("/prayers", { method: "POST", body: data }),
    updatePrayer: (id, data) => request(`/prayers/${encodeURIComponent(id)}`, { method: "PUT", body: data }),
    answerPrayer: (id, note) =>
        request(`/prayers/${encodeURIComponent(id)}/answered`, { method: "POST", body: { note } }),
    deletePrayer: (id) => request(`/prayers/${encodeURIComponent(id)}`, { method: "DELETE" }),

    // --- Reflections / Journal (§8) — premium; Neon-backed (may 503) ---
    listReflections: async (params) => itemsOf(await request("/reflections", { query: params })),
    createReflection: (data) => request("/reflections", { method: "POST", body: data }),
    deleteReflection: (id) => request(`/reflections/${encodeURIComponent(id)}`, { method: "DELETE" }),

    // --- Reading plans (§9) ---
    listPlans: async () => itemsOf(await request("/plans")),
    getPlan: (slug) => request(`/plans/${encodeURIComponent(slug)}`),
    listEnrolledPlans: async () => itemsOf(await request("/plans/enrolled")),
    enrollPlan: (slug, body = {}) =>
        request(`/plans/${encodeURIComponent(slug)}/enroll`, { method: "POST", body }),
    completePlanDay: (enrollmentId, dayNumber, reflection) =>
        request(`/plans/enrolled/${encodeURIComponent(enrollmentId)}/complete-day`, {
            method: "POST",
            body: { dayNumber, reflection: reflection || undefined },
        }),
    pausePlan: (enrollmentId, paused) =>
        request(`/plans/enrolled/${encodeURIComponent(enrollmentId)}/pause`, {
            method: "POST",
            body: paused === undefined ? {} : { paused },
        }),

    // --- Check-ins (§10) ---
    listCheckins: async (params) => itemsOf(await request("/checkins", { query: params })),

    // --- My Walk (§11) ---
    getWalkSummary: () => request("/walk/summary"),
    listMemories: async () => itemsOf(await request("/walk/memories")),
    deleteMemory: (id) => request(`/walk/memories/${encodeURIComponent(id)}`, { method: "DELETE" }),
    clearMemories: () => request("/walk/memories", { method: "DELETE" }),

    // --- Account preferences (§12) ---
    getPreferences: () => request("/users/preferences"),
    updatePreferences: (patch) => request("/users/preferences", { method: "PUT", body: patch }),
};

export { request as apiRequest, requestWithMeta, API_BASE };
