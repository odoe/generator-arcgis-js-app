import registerSuite from 'intern!object';
import expect from 'intern/chai!expect';

import view from 'app/components/<%=name%>/View';

registerSuite({
  name: 'view: <%=name%>',
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
  'Component is valid': function() {
    expect(Controller).to.not.be.undefined;
  }
});
