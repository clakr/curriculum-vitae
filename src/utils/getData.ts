import { address, phone } from "../content/information/index.json";
import formatMiscellaneousList from "./formatMiscellaneousList";
import formatOrganizationDate from "./formatOrganizationDate";
import formatToFullName from "./formatToFullName";
import { getCollection, getEntry } from "astro:content";

const organizations = await getCollection("organization");

export default async function () {
	const information = {
		name: formatToFullName(),
		email: address.email,
		address: address.physical,
		phone,
	};

	const education = (await getCollection("education")).map(({ data }) => {
		const organization = organizations.find(
			({ id }) => id === data.organization.id,
		)?.data;
		if (!organization) return { ...data };

		const { durationFrom, durationTo, name, ...rest } = organization;
		const duration = formatOrganizationDate({ durationFrom, durationTo });

		return {
			...data,
			organization: {
				...rest,
				name: name.toLocaleUpperCase(),
				duration,
			},
		};
	});

	const experience = (await getCollection("experience")).map(({ data }) => {
		const organization = organizations.find(
			({ id }) => id === data.organization.id,
		)?.data;
		if (!organization) return { ...data };

		const { durationFrom, durationTo, name, ...rest } = organization;
		const duration = formatOrganizationDate({ durationFrom, durationTo });

		return {
			...data,
			organization: {
				...rest,
				name: name.toLocaleUpperCase(),
				duration,
			},
		};
	});

	const leadership = (await getCollection("leadership"))
		.filter(({ data: { isHidden } }) => !isHidden)
		.map(({ data }) => {
			const organization = organizations.find(
				({ id }) => id === data.organization.id,
			)?.data;
			if (!organization) return { ...data };

			const { durationFrom, durationTo, name, ...rest } = organization;
			const duration = formatOrganizationDate({ durationFrom, durationTo });

			return {
				...data,
				organization: {
					...rest,
					name: name.toLocaleUpperCase(),
					duration,
				},
			};
		});

	const technical = formatMiscellaneousList(
		(await getEntry("technical", "index")).data.list,
	);

	const tool = formatMiscellaneousList(
		(await getEntry("tool", "index")).data.list,
	);
	const language = formatMiscellaneousList(
		(await getEntry("language", "index")).data.list,
	);
	const interest = formatMiscellaneousList(
		(await getEntry("interest", "index")).data.list,
	);

	return {
		information,
		education,
		experience,
		leadership,
		technical,
		tool,
		language,
		interest,
	};
}
