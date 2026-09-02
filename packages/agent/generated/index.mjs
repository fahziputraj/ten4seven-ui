import agentIndex from "./agent-index.json" with { type: "json" };
import aliases from "./aliases.json" with { type: "json" };
import brandProfiles from "./brand-profiles.json" with { type: "json" };
import themeRecipes from "./theme-recipes.json" with { type: "json" };
import tokensDtcg from "./tokens.dtcg.json" with { type: "json" };
import actionFooter from "./components/ActionFooter.json" with { type: "json" };
import input from "./components/Input.json" with { type: "json" };
import passwordInput from "./components/PasswordInput.json" with { type: "json" };
import surface from "./components/Surface.json" with { type: "json" };
import ownershipRules from "./ownership-rules.json" with { type: "json" };
import auth from "./recipes/auth.json" with { type: "json" };
import entityDetail from "./recipes/entity-detail.json" with { type: "json" };
import entityList from "./recipes/entity-list.json" with { type: "json" };
import index from "./index.json" with { type: "json" };

/**
 * Generated public projections intentionally expose the canonical recipe
 * manifests and the Authentication proof contracts only. Runtime consumers
 * should use @ten4seven/agent/node for selective loading of other shards.
 */
const recipes = Object.freeze({
  "entity-list": entityList,
  "entity-detail": entityDetail,
  auth,
});

const components = Object.freeze({
  ActionFooter: actionFooter,
  Input: input,
  PasswordInput: passwordInput,
  Surface: surface,
});

export {
  agentIndex,
  aliases,
  brandProfiles,
  components,
  index,
  ownershipRules,
  recipes,
  themeRecipes,
  tokensDtcg,
};
