import type { Schema, Struct } from '@strapi/strapi';

export interface ArrayLink extends Struct.ComponentSchema {
  collectionName: 'components_array_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArrayList extends Struct.ComponentSchema {
  collectionName: 'components_array_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    item: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SingleOrganization extends Struct.ComponentSchema {
  collectionName: 'components_single_organizations';
  info: {
    displayName: 'Organization';
  };
  attributes: {
    from: Schema.Attribute.Date & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    to: Schema.Attribute.Date;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'array.link': ArrayLink;
      'array.list': ArrayList;
      'single.organization': SingleOrganization;
    }
  }
}
