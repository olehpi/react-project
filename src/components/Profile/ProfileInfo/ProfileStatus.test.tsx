import { describe, test, expect, vi } from "vitest";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {

  test("status from props should be in the state", () => {
    const mockCallback = vi.fn();

    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<ProfileStatus status="Active dev" updateStatus={mockCallback} />);
    });

    const instance = component!.getInstance()  as unknown as ProfileStatus;
    expect(instance!.state.status).toBe("Active dev");
  });

  test("after creation <span> with status should be displayed", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="Active dev" updateStatus={mockCallback} />);
    });

    const root = component!.root;
    const spans = root.findAllByType("span");
    expect(spans.length).toBe(1);
  });

  test("after creation <span> should display correct status", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="Active dev" updateStatus={mockCallback} />);
    });

    const root = component!.root;
    const span = root.findByType("span");
    expect(span.props.children).toBe("Active dev");
  });

  test("after creation <input> shouldn't be displayed", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="Active dev" updateStatus={mockCallback} />);
    });

    const root = component!.root;
    const inputs = root.findAllByType("input");
    expect(inputs.length).toBe(0);
  });

  test("<input> should appear in edit mode instead of <span>", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="Active dev" updateStatus={mockCallback} />);
    });

    const root = component!.root;
    const span = root.findByType("span");

    act(() => {
      span.props.onDoubleClick();
    });

    const input = root.findByType("input");
    expect(input.props.value).toBe("Active dev");
  });

  test("callback should be called on blur after edit", () => {
    const mockCallback = vi.fn();

    let component;
    act(() => {
      component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback} />);
    });

    const root = component!.root;
    const span = root.findByType("span");

    act(() => { span.props.onDoubleClick(); });

    const input = root.findByType("input");

    act(() => { input.props.onChange({ currentTarget: { value: "New status" } }); });
    act(() => { input.props.onBlur(); });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});