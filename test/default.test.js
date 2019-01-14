const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-fs'));

const { expect } = chai;


describe('default theme', () => {
  describe('directory', () => {
    it('contains boilerplate files', () => {
      expect('default').to.be.a.directory();
      expect('default/CONTRIBUTING.md').to.be.a.file();
      expect('default/LICENSE.md').to.be.a.file();
      expect('default/README.md').to.be.a.file();
    });

    it('contains uswds assets', () => {
      expect('default/assets/uswds').to.be.a.directory();
      expect('default/assets/uswds/fonts').to.be.a.directory().and.include.contents([
        'merriweather',
        'public-sans',
        'roboto-mono',
        'source-sans-pro',
      ]);
      expect('default/assets/uswds/img').to.be.a.directory().and.include.contents([
        'us_flag_small.png',
      ]);
      expect('default/assets/uswds/js').to.be.a.directory().and.include.contents([
        'uswds.min.js',
      ]);
    });
  });
});
