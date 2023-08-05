let dotNetObject;

async function handlePopState() {

  const dontPop = await dotNetObject.invokeMethodAsync("HandlePopState");

  if (dontPop) {
    // add the current location back to stack
    history.pushState({}, "", window.location.href);
  }
  else {
    history.back();
  }

}

export async function handleUiBackButton() {

  const dontPop = await dotNetObject.invokeMethodAsync("HandlePopState");

  if (!dontPop) {
    // -2 because we have the current location as top two entries on the stack
    history.go(-2);
  }
}

export function addPopStateListener(dotNetInstance) {
  dotNetObject = dotNetInstance;
  // add an extra copy of the current location to stack so that when popped by the browser back button we dont change.
  history.pushState({}, "", window.location.href);
  window.addEventListener("popstate", handlePopState);
}

export function removePopStateListener() {
  window.removeEventListener("popstate", handlePopState);
}