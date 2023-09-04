export const csr = true;
export const ssr = false;

import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	if (!params.id) throw redirect(308, "/set");
};
