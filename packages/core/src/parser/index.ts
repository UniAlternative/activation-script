export class SurgeConfigParser {
  private config: Record<string, any> = {};

  constructor(configText: string) {
    this.parseConfig(configText);
  }

  private stringifyValue(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    } else if (typeof value === 'number') {
      return value.toString();
    }

    return value;
  }

  private parseConfig(configText: string) {
    const sections = configText.split(/\[(.*?)\]/).filter(Boolean);

    for (let i = 0; i < sections.length; i += 2) {
      const sectionName = sections[i].trim();
      const sectionContent = sections[i + 1].trim();
      this.config[sectionName] = this.parseSection(sectionContent);
    }
  }

  private parseSection(sectionContent: string): Record<string, any> {
    const lines = sectionContent.split('\n');
    const sectionData: Record<string, any> = {};

    lines.forEach((line) => {
      const [key, value] = line.split('=').map((item) => item.trim());
      if (key && value) {
        sectionData[key] = this.parseValue(value);
      }
    });

    return sectionData;
  }

  private parseValue(value: string): any {
    value = value.split('#')[0].trim();
    if (value.includes(',')) {
      return value.split(',').map((item) => item.trim());
    } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      return value.toLowerCase() === 'true';
    } else if (!isNaN(parseFloat(value))) {
      return parseFloat(value);
    }

    return value;
  }

  getConfig(): Record<string, any> {
    return this.config;
  }

  getSection(sectionName: string): Record<string, any> {
    return this.config[sectionName];
  }

  writeConfig(): string {
    const sections = Object.keys(this.config);
    const configText = sections
      .map((sectionName) => {
        const sectionContent = this.config[sectionName];
        const sectionContentText = Object.keys(sectionContent)
          .map((key) => `${key} = ${this.stringifyValue(sectionContent[key])}`)
          .join('\n');
        return `[${sectionName}]\n${sectionContentText}`;
      })
      .join('\n\n');

    return configText;
  }
}
