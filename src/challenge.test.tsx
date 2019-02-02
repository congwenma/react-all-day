import * as Bluebird from "bluebird";
import { configure, mount, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { Breadcrumb } from "./Breadcrumb";
import { configureStore } from "./redux";
import { DELAY_MAX } from "./Server";
import Server from "./Server";

configure({ adapter: new Adapter() });

test("Challenge 1: Breadcrumb component", () => {
  /**
   * Flesh out the `Breadcrumb` to take an array of numbers and render the DOM
   * structure for a breadcrumb list as demonstrated here (but don't use anchor
   * tags `<a>`):
   * https://bulma.io/documentation/components/breadcrumb/
   *
   * - Items in the breadcrumb list must be rounded down to
   *     **3 significant digits** with leading and trailing zeroes.
   *
   * When that's done, unskip this test and run `yarn test` in a console to see
   * the result.
   */

  const component = mount(<Breadcrumb values={[0.2, 0.44456, 13.33]} />);

  expect(
    component.contains(
      <div className="breadcrumb">
        <ul>
          <li>0.200</li>
          <li>0.444</li>
          <li>13.330</li>
        </ul>
      </div>
    )
  ).toBe(true);
});

test("Challenge 2: dispatching redux actions", () => {
  /**
   * The App component is set up to display the current count for the counter
   * reducer.
   *
   * Modify the App component so that it will increment the counter by
   * **the current count** when the `#increment-btn` element is clicked.
   */

  const store = configureStore();
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const button = app.find("#increment-btn");

  expect(app.contains(<p className="title">{1}</p>)).toBe(true);

  button.simulate("click");

  expect(app.contains(<p className="title">{2}</p>)).toBe(true);

  button.simulate("click");

  expect(app.contains(<p className="title">{4}</p>)).toBe(true);

  button.simulate("click");

  expect(app.contains(<p className="title">{8}</p>)).toBe(true);

  button.simulate("click");

  expect(app.contains(<p className="title">{16}</p>)).toBe(true);
});

test("Challenge 3: AsyncTracker", async () => {
  /**
   * This test will have you use the `AsyncTracker` component to watch the
   * progress of an asynchronous action dispatch.
   *
   * You will need to dig into the `AsyncTracker.tsx` file to learn how to use
   * it correctly.
   *
   * Modify the `App` component such that clicking the `#delay-increment-btn`
   * element will increment the counter with a 1 second delay (using the
   * `delayIncrement` action creator).
   *
   * While the increment is pending, use an `AsyncTracker` component to display
   * a "Loading" indicator using a span element like so:
   * `<span>Loading...</span>`.
   *
   * Hint: The async ID for the `delayIncrement` action creator is
   * `delay-increment`.
   *
   * Bonus 1: When the increment is complete, use an `AsyncTracker` callback to
   * emit a log message with whatever you like.
   *
   * Bonus 2: Find a way to test the logging behavior.
   *
   * Bonus 3: Make the test run faster by using Sinon and getting rid of the
   * `Bluebird.delay` call.
   */

  const store = configureStore();
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const button = app.find("#delay-increment-btn");

  expect(app.contains(<p className="title">{1}</p>)).toBe(true);
  expect(app.contains(<span>Loading...</span>)).toBe(false);

  button.simulate("click");
  app.update(); // Ensure the component has re-rendered.

  expect(app.contains(<p className="title">{1}</p>)).toBe(true);
  expect(app.contains(<span>Loading...</span>)).toBe(true);

  await Bluebird.delay(2000);
  app.update();

  expect(app.contains(<p className="title">{2}</p>)).toBe(true);
  expect(app.contains(<span>Loading...</span>)).toBe(false);
});

test("Challenge 4: remote API call", async () => {
  /**
   * For this test, write an action creator that calls the `getStuff()`
   * function from `Server.ts`. This method returns a promise that
   * eventually resolves with an array of numbers ranging from 0 to 1. To
   * successfully complete this challenge the following requirements must be
   * satisified:
   *
   * - `App.tsx` must use the `Breadcrumb` component to display each number that
   *     is  **less than 0.5**.
   * - All components must be stateless (the results of the `getStuff()` call
   *     must be stored using a new reducer).
   * - The `Breadcrumb` must **not** re-render if `#increment-btn` is clicked.
   *     (It has absolutely nothing to do with the counter!)
   *     Hint: Look at `src/selectors/async.ts`.
   *
   * Once that action creator is ready, hook it up to the
   * `#remote-fetch-btn` element and unskip this test.
   *
   * Bonus 1: Make the test more reliable by reading the results of the
   * `getStuff` call from the store and using that to assert the contents of
   * the `Breadcrumb` list.
   *
   * Bonus 2: Add tests for the new action creator and reducer.
   *
   * Bonus 3: Use Sinon to make the test deterministic and eliminate all random
   * behavior.
   */

  const store = configureStore();
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const button = app.find("#remote-fetch-btn");

  button.simulate("click");
  await Bluebird.delay(DELAY_MAX);
  app.update();
  debugger;
  const newBreadcrumbValues = app.instance().state.storeState.breadcrumb.value;

  console.log(app.html());
  newBreadcrumbValues.forEach((value: number) => {
    expect(
      app.contains(<li> {(Math.floor(value * 1000) / 1000).toFixed(3)}</li>)
    ).toBe(true);
  });
});

test.skip("Challenge 5: simulating failure", () => {
  /**
   * Use Sinon to replace the `getStuff()` implementation in `Server.ts` to
   * return a Promise that always rejects.
   *
   * - Ensure that the error message (`ERROR_MESSAGE`) is displayed exactly
   *     as-is within a "danger" notification box:
   *     `<div className="notification is-danger"></div>`
   * - The notification box must not appear until an error occurs.
   *
   * Note that completing this (or any other) challenge must not cause other
   * tests to fail.
   */
  const ERROR_MESSAGE = "Failed to get the stuff!";

  /** ADD STUB IMPLEMENTATION OF `getStuff()` HERE */

  const store = configureStore();
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const button = app.find("#remote-fetch-btn");

  expect(app.contains(<div className="notification is-danger" />)).toBe(false);

  button.simulate("click");
  app.update();

  expect(
    app.contains(<div className="notification is-danger">{ERROR_MESSAGE}</div>)
  ).toBe(true);
});

test.skip("Challenge 6: component refactoring");
/**
 * This challenge has no pre-defined tests.
 *
 * The goal is to take the App.tsx file and refactor it so that it uses
 * components instead of using the ReactDOM elements directly.
 *
 * As an example: `<p className="heading">Counter</p>` can become
 * `<Heading>Counter</Heading>`. Use your judgment to determine how to break up
 * the components and design their props API. Refer to the documentation for the
 * CSS library used here for inspiration: https://bulma.io/documentation/
 *
 * There should be no remaining ReactDOM elements (`<section>`, `<div>`, etc.)
 * in App.tsx by the end of this exercise, and all tests must pass after the
 * refactoring is done.
 */

test.skip("Challenge 7: generic getStuff", () => {
  /**
   * Modify the `getStuff()` function to accept an **optional** `generator`
   * argument: this "generator" is a function that, when called, returns a
   * random value of any one type to be included in the array of stuff.
   *
   * - Use of type coercion (`as`) and the `any` keyword is forbidden.
   * - The default generator should produce the same behavior as the existing
   *     `getStuff` function.
   * - As before, this change must not break existing tests.
   *
   * The test expectations are commented because they will not typecheck as-is.
   */
  // const RANDOM_STRINGS = ["foo", "bar", "baz", "boop", "bop"];
  // const randomString = () => RANDOM_STRINGS[randInt(0, RANDOM_STRINGS.length)];
  // const alwaysNull = () => null;
  // expect(Server.getStuff(randomString).toBeTruthy();
  // expect(Server.getStuff(alwaysNull).toBeTruthy();
});
