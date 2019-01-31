import * as React from "react";

export interface Props {
  values: number[];
}

export class Breadcrumb extends React.PureComponent<Props> {
  render() {
    const { values } = this.props;

    return (
      <div className="breadcrumb">
        <ul>
          {values.map((value, key) => (
            <li key={key}>{(Math.floor(value * 1000) / 1000).toFixed(3)}</li>
          ))}
        </ul>
      </div>
    );
  }
}
