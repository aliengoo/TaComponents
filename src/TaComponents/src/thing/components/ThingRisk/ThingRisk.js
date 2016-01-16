"use strict";

import React, {Component, PropTypes} from "react";
import ThingRiskDescription from "./ThingRiskDescription/ThingRiskDescription";
import ThingRiskMitigation from "./ThingRiskMitigation/ThingRiskMitigation";
import ThingRiskProbability from "./ThingRiskProbability/ThingRiskProbability";
import ThingRiskSeverity from "./ThingRiskSeverity/ThingRiskSeverity";


export default class ThingRisk extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fieldSetter, risk, riskSeverities, riskProbabilities} = this.props;

    return (
      <fieldset className="ThingRisk">
        <legend>Risk</legend>

        <ThingRiskDescription
          value={risk.description}
          fieldSetter={fieldSetter}/>

        <ThingRiskSeverity
          label={"Severity"}
          value={risk.severityId}
          fieldSetter={fieldSetter}
        />

        <ThingRiskProbability
          label={"Probability"}
          value={risk.probabilityId}
          fieldSetter={fieldSetter}
        />

        <ThingRiskMitigation
          value={risk.mitigation}
          fieldSetter={fieldSetter}
        />

        <ThingRiskSeverity
          label={"Mitigated Severity"}
          value={risk.mitigatedSeverityId}
          fieldSetter={fieldSetter}
        />

        <ThingRiskProbability
          label={"Mitigated Probability"}
          value={risk.mitigatedProbabilityId}
          fieldSetter={fieldSetter}
        />
      </fieldset>
    );
  }
}

ThingRisk.defaultProps = {
  risk: {},
  riskSeverities: [],
  riskProbabilities: []
};

ThingRisk.propTypes = {
  fieldSetter: PropTypes.func.isRequired,
  risk: PropTypes.object,
  riskSeverities: PropTypes.arrayOf(PropTypes.object),
  riskProbabilities: PropTypes.arrayOf(PropTypes.object)
};