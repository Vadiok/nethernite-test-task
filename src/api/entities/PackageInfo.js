export class PackageInfo {
  name;

  version;

  description;

  deprecated;

  repository;

  owner;

  tags;

  keywords;

  homepage;

  license;

  constructor(data = {}) {
    this.name = data.name || '';
    this.version = (data.version && data.version.length) ? data.version : null;
    this.description = (data.description && data.description.length) ? data.description : null;
    this.deprecated = !!data.deprecated;
    this.repository = data.repository || null;
    this.owner = data.owner || null;
    this.tags = Array.isArray(data.tags) ? [...data.tags] : [];
    this.keywords = Array.isArray(data.keywords) ? [...data.keywords] : [];
    this.homepage = (data.homepage && data.homepage.length) ? data.homepage : null;
    this.license = (data.license && data.license.length) ? data.license : null;
  }
}
