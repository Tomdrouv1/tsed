import {getEngineFixture} from "../../test/getEngineFixture.js";
import {VelocityEngine} from "./VelocityEngine.js";

describe("VelocityEngine", () => {
  it("should render the given content (by string - no cache)", async () => {
    const {render, locals, $compile} = await getEngineFixture({token: "velocityjs"});
    await render();

    expect(await render()).toEqual("<p>Tobi</p>\n");
    expect($compile()).toHaveBeenCalledTimes(2);
    expect($compile()).toHaveBeenCalledWith("<p>$user.name</p>\n", {...locals, cache: false});
  });
  it("should render the given content (by string - with cache)", async () => {
    const {render, locals, $compile} = await getEngineFixture({token: VelocityEngine, cache: true});
    await render();

    expect(await render()).toEqual("<p>Tobi</p>\n");
    expect($compile()).toHaveBeenCalledTimes(2);
    expect($compile()).toHaveBeenCalledWith("<p>$user.name</p>\n", {...locals, cache: true});
  });
  it("should render the given content (by file - no cache)", async () => {
    const {renderFile, locals, $compile, path, template} = await getEngineFixture({token: VelocityEngine});
    await renderFile();
    const content = await renderFile();

    expect(content).toEqual("<p>Tobi</p>\n");
    expect($compile()).toHaveBeenCalledTimes(2);
    expect($compile()).toHaveBeenCalledWith(template, {
      ...locals,
      partials: undefined,
      filename: path,
      cache: false
    });
  });
  it("should render the given content (by file - with cache)", async () => {
    const {renderFile, locals, $compile, path, template} = await getEngineFixture({token: VelocityEngine, cache: true});

    await renderFile();
    const content = await renderFile();

    expect(content).toEqual("<p>Tobi</p>\n");
    expect($compile()).toHaveBeenCalledTimes(1);
    expect($compile()).toHaveBeenCalledWith(template, {
      ...locals,
      partials: undefined,
      filename: path,
      cache: true
    });
  });
});
