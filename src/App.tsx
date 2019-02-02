import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import AsyncTracker from "./AsyncTracker";
import { Breadcrumb } from "./Breadcrumb";
import { actionCreators } from "./redux/actions/counter";
import { actionCreators as serverfetchActionCreator } from "./redux/actions/server-fetch";
import { RootState } from "./redux/reducers";

interface ConnectProps {
  counter: number;
  breadcrumb: number[];
  increment(): void;
  delayIncrement(): void;
  fetchFromServer(): void;
}

type Props = {} & ConnectProps;

export class App extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Counter App</h1>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Counter</p>
                <p className="title">{this.props.counter}</p>
                <AsyncTracker
                  pendingContent={<span>Loading...</span>}
                  id="delay-increment"
                />
                <AsyncTracker
                  resolvedContent={
                    <Breadcrumb values={this.props.breadcrumb} />
                  }
                  id="fetch-from-server"
                />
              </div>
            </div>
          </div>
          {/* Challenge 5: <div className="notification is-danger" /> */}
          <div className="field is-grouped">
            <p className="control">
              <button
                className="button"
                id="increment-btn"
                onClick={() => {
                  this.props.increment();
                }}
              >
                Click to increment
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                id="delay-increment-btn"
                onClick={() => {
                  this.props.delayIncrement();
                }}
              >
                Click to increment slowly
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                id="remote-fetch-btn"
                onClick={() => {
                  this.props.fetchFromServer();
                }}
              >
                Click to fetch server-side
              </button>
            </p>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  counter: state.counter.value,
  breadcrumb: state.breadcrumb.value
});

const mapDispatchToProps = {
  increment: actionCreators.increment,
  delayIncrement: actionCreators.delayIncrement,
  fetchFromServer: serverfetchActionCreator.fetchFromServer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
