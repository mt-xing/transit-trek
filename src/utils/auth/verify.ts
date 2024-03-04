import type { User } from "@auth/sveltekit";
// import { ADMINS } from "$env/static/private";

const ADMINS = "jeffwang16@gmail.com";

const validAdminEmails = new Set(ADMINS.split("||"));

export function isValidAdmin(user: User) {
    if (!user.email) { return false; }
    return validAdminEmails.has(user.email);
}
