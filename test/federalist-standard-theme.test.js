const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-fs'));

const { expect } = chai;


describe('federalist-standard-theme', () => {
  describe('directory', () => {
    it('contains boilerplate files', () => {
      expect('federalist-standard-theme').to.be.a.directory();
      expect('federalist-standard-theme/CONTRIBUTING.md').to.be.a.file();
      expect('federalist-standard-theme/LICENSE.md').to.be.a.file();
      expect('federalist-standard-theme/README.md').to.be.a.file();
    });

    it('contains uswds assets', () => {
      expect('federalist-standard-theme/assets/uswds').to.be.a.directory();
      expect('federalist-standard-theme/assets/uswds/fonts').to.be.a.directory().and.include.contents([
        'merriweather',
        'public-sans',
        'roboto-mono',
        'source-sans-pro',
      ]);
      expect('federalist-standard-theme/assets/uswds/img').to.be.a.directory().and.include.contents([
        'us_flag_small.png',
      ]);
      expect('federalist-standard-theme/assets/uswds/js').to.be.a.directory().and.include.contents([
        'uswds.min.js',
      ]);
      expect('federalist-standard-theme/assets/uswds/css').to.be.a.directory().and.include.contents([
        'uswds.min.css',
      ]);
    });
  });
});
