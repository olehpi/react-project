import { describe, test, expect } from "vitest";
import { create, act } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import { vi } from 'vitest';

describe("ProfileStatus component", () => {

  test("status from props should be in the state", () => {

    let component;

    act(() => {
      component = create(<ProfileStatus status="Active dev" />);
    });

    const instance = component.getInstance();
    expect(instance.state.status).toBe("Active dev");
  });

  test("after creation <span> with status should be displayed", () => {

    let component;

    act(() => {
      component = create(<ProfileStatus status="Active dev" />);
    });

    const root = component.root;
    const spans = root.findAllByType("span");
    expect(spans.length).toBe(1);
  });

  test("after creation <span> with status should be displayed with correct status", () => {

    let component;

    act(() => {
      component = create(<ProfileStatus status="Active dev" />);
    });

    const root = component.root;
    const spans = root.findAllByType("span");
    expect(spans.length).toBe(1);
  });

  test("after creation <input> shouldn't be displayed", () => {

    let component;

    act(() => {
      component = create(<ProfileStatus status="Active dev" />);
    });

    const root = component.root;
    const inputs = root.findAllByType("input");
    expect(inputs.length).toBe(0);
  });

  test("<input> should be displayed in edit mode instead of span", () => {
    let component;

    act(() => {
      component = create(<ProfileStatus status="Active dev" />);
    });

    const root = component.root;
    const span = root.findByType("span");

    act(() => {
      span.props.onDoubleClick(); // переключаем editMode = true
    });

    const input = root.findByType("input");
    expect(input.props.value).toBe("Active dev");
  });

  test("callback should be called", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback} />);
    });

    const root = component.root;
    const span = root.findByType("span");

    act(() => { span.props.onDoubleClick(); });

    const input = root.findByType("input");

    act(() => { input.props.onChange({ currentTarget: { value: "New status" } }); });

    act(() => { input.props.onBlur(); });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});


