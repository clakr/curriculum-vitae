type Args = {
	durationFrom: Date;
	durationTo: Date | undefined;
};

const formatter = new Intl.DateTimeFormat("en-PH", {
	year: "numeric",
	month: "long",
});

export default function ({ durationFrom, durationTo }: Args) {
	if (!durationTo) return `${formatter.format(durationFrom)} - Present`;

	return `${formatter.format(durationFrom)} - ${formatter.format(durationTo)}`;
}
