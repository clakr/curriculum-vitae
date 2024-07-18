import {
  Page,
  Text,
  Document,
  render,
  Font,
  View,
  Link,
  type ViewProps,
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
        }}
      >
        {name}
      </Text>
      <Information>
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
        <View key={i}>
          <Organization {...organization} />
          <View style={{}}>
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
        <View key={i}>
          <Text>{name}</Text>
          <Text>{description}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>{link}</Text>
            <Text>&#x2022;</Text>
            <Text>{repository}</Text>
          </View>
        </View>
      ))}
    </Section>
  );
}

function Education() {
  return (
    <Section header="Education">
      {education.map((e, i) => (
        <Text key={i}>{JSON.stringify(e)}</Text>
      ))}
    </Section>
  );
}

function Miscellaneous() {
  return (
    <Section header="Skills & Interests">
      <Text>TECHNICAL {LIST_FORMATTER.format(technical)}</Text>
      <Text>FRAMEWORK {LIST_FORMATTER.format(framework)}</Text>
      <Text>TOOL {LIST_FORMATTER.format(tool)}</Text>
      <Text>LANGUAGE {LIST_FORMATTER.format(language)}</Text>
      <Text>INTEREST {LIST_FORMATTER.format(interest)}</Text>
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
    <View style={{ ...style }} {...rest}>
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
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>{name},</Text>
        <Text style={{ fontStyle: "italic" }}>
          {formatOrganizationDuration(from, to)},
        </Text>
        <Text style={{ fontStyle: "italic" }}>{location}</Text>
      </View>
      {position ? <Text style={{ fontWeight: "bold" }}>{position}</Text> : null}
    </>
  );
}

function ListItem({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
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

render(<PDF />, `public/${PDF_FILENAME}`);