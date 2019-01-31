import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import AsyncTracker from "./AsyncTracker";
import { actionCreators } from "./redux/actions/counter";
import { RootState } from "./redux/reducers";

interface ConnectProps {
  counter: number;
  increment(): void;
  delayIncrement(): void;
}

type Props = {} & ConnectProps;

export class App extends React.PureComponent<Props> {
  render() {
    return (
      <>
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
              <button className="button" id="remote-fetch-btn">
                Click to fetch server-side
              </button>
            </p>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  counter: state.counter.value
});

const mapDispatchToProps = {
  increment: actionCreators.increment,
  delayIncrement: actionCreators.delayIncrement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
