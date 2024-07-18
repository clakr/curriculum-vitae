import {
  Page,
  Text,
  Document,
  render,
  Font,
  View,
  Link,
  type ViewProps,
  Svg,
  Line,
} from "@react-pdf/renderer";
import { LIST_FORMATTER, PDF_FILENAME } from "#utils/constants.ts";
import { name, phoneNumber, address, site } from "#src/information.json";
import getPDFData from "./getPDFData";
import RubikRegular from "#public/Rubik-Regular.ttf";
import RubikItalic from "#public/Rubik-Italic.ttf";
import RubikBold from "#public/Rubik-Bold.ttf";
import formatOrganizationDuration from "./formatOrganizationDuration";
import type { PropsWithChildren } from "react";
import type { InferEntrySchema } from "astro:content";

const {
  experience,
  project,
  education,
  technical,
  framework,
  tool,
  language,
  interest,
} = await getPDFData();

Font.register({
  family: "Rubik",
  fonts: [
    { src: RubikRegular, fontWeight: "normal" },
    { src: RubikBold, fontWeight: "bold" },
    { src: RubikItalic, fontStyle: "italic" },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

function PDF() {
  return (
    <Document style={{ fontSize: 10, fontFamily: "Rubik" }}>
      <Page size="A4" style={{ padding: 40 }}>
        <Header />
        <Experience />
        <Project />
        <Education />
        <Miscellaneous />
      </Page>
    </Document>
  );
}

function Header() {
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          borderBottom: 0.75,
          paddingBottom: 6,
        }}
      >
        {name}
      </Text>
      <Information style={{ paddingTop: 6 }}>
        <Text>{phoneNumber}</Text>
        <Text>&#x2022;</Text>
        <Link>{address.email}</Link>
        <Text>&#x2022;</Text>
        <Text>{address.physical}</Text>
      </Information>
      <Information>
        <Link>{site.linktree}</Link>
        <Text>&#x2022;</Text>
        <Link>{site.github}</Link>
      </Information>
    </>
  );
}

function Experience() {
  return (
    <Section header="Experience">
      {experience.map(({ responsibilities, organization }, i) => (
        <View key={i} style={{ marginVertical: 4 }}>
          <Organization {...organization} />
          <View style={{ marginVertical: 2, marginHorizontal: 16 }}>
            {responsibilities.map((r, rIndex) => (
              <ListItem key={rIndex}>{r}</ListItem>
            ))}
          </View>
        </View>
      ))}
    </Section>
  );
}

function Project() {
  return (
    <Section header="Project">
      {project.map(({ name, description, link, repository }, i) => (
        <View key={i} style={{ marginVertical: 4 }}>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Text style={{ marginVertical: 2 }}>{description}</Text>
          <View style={{ display: "flex", flexDirection: "row", columnGap: 4 }}>
            <Link>{link}</Link>
            <Text>&#x2022;</Text>
            <Link>{repository}</Link>
          </View>
        </View>
      ))}
    </Section>
  );
}

function Education() {
  return (
    <Section header="Education">
      {education.map(({ degree, thesis, awards, organization }, i) => (
        <View key={i} style={{ marginVertical: 4 }}>
          <Organization {...organization} />
          <View style={{ marginVertical: 4, marginHorizontal: 16 }}>
            {degree && <EducationData term="Degree" description={degree} />}
            {thesis && <EducationData term="Thesis" description={thesis} />}
            {awards && <EducationData term="Awards" description={awards} />}
          </View>
        </View>
      ))}
    </Section>
  );
}

function Miscellaneous() {
  return (
    <Section header="Skills & Interests">
      <MiscellaneousData term="Technical" description={technical} />
      <MiscellaneousData term="Framework" description={framework} />
      <MiscellaneousData term="Tool" description={tool} />
      <MiscellaneousData term="Language" description={language} />
      <MiscellaneousData term="Interest" description={interest} />
    </Section>
  );
}

function Information({
  children,
  style,
  ...rest
}: PropsWithChildren<ViewProps>) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 4,
        paddingBottom: 2,
        ...style,
      }}
      {...rest}
    >
      {children}
    </View>
  );
}

function Section({
  children,
  style,
  header,
  ...rest
}: PropsWithChildren<ViewProps & { header: string }>) {
  return (
    <View style={{ marginTop: 20, ...style }} {...rest}>
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>{header}</Text>
      {children}
    </View>
  );
}

function Organization({
  name,
  duration,
  location,
  position,
}: InferEntrySchema<"organization">) {
  const from = new Date(duration.from);
  const to = duration.to ? new Date(duration.to) : undefined;

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 4 }}>
        <Text style={{ fontWeight: "bold" }}>{name},</Text>
        <Text style={{ fontStyle: "italic" }}>
          {formatOrganizationDuration(from, to)},
        </Text>
        <Text style={{ fontStyle: "italic" }}>{location}</Text>
      </View>
      {position && <Text style={{ fontWeight: "bold" }}>{position}</Text>}
    </View>
  );
}

function ListItem({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 16,
        marginVertical: 2,
      }}
    >
      <View
        style={{
          width: 4,
          height: 4,
          backgroundColor: "black",
          borderRadius: "100%",
          top: 4,
        }}
      />
      <Text>{children}</Text>
    </View>
  );
}

function EducationData({
  term,
  description,
}: {
  term: string;
  description: string;
}) {
  return (
    <View style={{ display: "flex", flexDirection: "row", paddingVertical: 2 }}>
      <Text style={{ flexBasis: "25%" }}>{term}</Text>
      <Text style={{ flexBasis: "75%" }}>{description}</Text>
    </View>
  );
}

function MiscellaneousData(props: { term: string; description: string[] }) {
  const term = props.term.toLocaleUpperCase();
  const description = LIST_FORMATTER.format(props.description);

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Text>{term}</Text>
      <Text>{description}</Text>
    </View>
  );
}

render(<PDF />, `public/${PDF_FILENAME}`);
