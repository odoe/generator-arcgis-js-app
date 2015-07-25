import registerSuite from 'intern!object';
import expect from 'intern/chai!expect';

import Model from 'app/models/model-<%=name%>';

registerSuite({
  name: 'model: model-<%=name%>',
  setup() {
    // set up test here
  },
  beforeEach() {
    // run before
  },
  afterEach() {
    // run after
  },
  teardown() {
    // destroy widget
  },
  'Model is valid': function() {
    expect(Model).to.not.be.undefined;
  }
});
