const jsTemplate = `import React from "react";
import PropTypes from "prop-types";

const {{COMPONENT_NAME}} = (props)=>{
return <div data-testid="{{COMPONENT_NAME}}">{{COMPONENT_NAME}}</div>;
}
{{COMPONENT_NAME}}.propTypes = {
}

export default {{COMPONENT_NAME}};
`;

const testTemplate = `import React from "react";
import { render } from "@testing-library/react";
import {{COMPONENT_NAME}} from "./{{COMPONENT_NAME}}";

describe("<{{COMPONENT_NAME}} />", ()=>{
  test('renders without crashing', ()=>{
    const { container } = render(<{{COMPONENT_NAME}} />);
    expect(container).toBeTruthy();
  });
});
`;

const cssTemplate = `.{{COMPONENT_NAME}}{
  /* ... */
}
`;

module.exports = { jsTemplate, testTemplate, cssTemplate };
