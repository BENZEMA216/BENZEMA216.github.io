## State of the MCP ecosystem

What 15,382 registry servers say about where the Model Context Protocol ecosystem actually is in July 2026. Compiled from the official registry, GitHub, npm and PyPI. [About the census & full dataset →](https://mcpcensus.pages.dev/)

1 — Scale

## 15,382 servers; 47% run remotely

The official registry holds 15,382 distinct servers (latest versions, deduplicated from all published version records). 7,203 expose hosted remote endpoints (streamable-http/sse); the rest install locally via npm, oci, pypi, nuget.

View as table

| Install type | Servers |
| --- | --- |
| npm | 5,578 |
| pypi | 2,500 |
| oci | 538 |
| mcpb | 326 |
| nuget | 76 |

2 — Health

## 16% of servers have a verified problem

1,880 point to GitHub repos that are gone (deleted or made private). 126 repos are archived. 218 npm packages are deprecated by their own authors. 299 haven't seen a push in six months. If you're choosing servers for production, the registry alone won't tell you this.

<svg viewBox="0 0 760 242" role="img" aria-label="Verified problems by type" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">GitHub repo gone (deleted/pr</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>GitHub repo gone (deleted/private): 1,880</title></rect> <text x="678" y="19.0" fill="currentColor">1,880</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">No repo push in 6+ months</text> <rect x="210" y="36" width="73" height="26" rx="2" fill="currentColor"><title>No repo push in 6+ months: 299</title></rect> <text x="291" y="53.0" fill="currentColor">299</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">npm package deprecated</text> <rect x="210" y="70" width="53" height="26" rx="2" fill="currentColor"><title>npm package deprecated: 218</title></rect> <text x="271" y="87.0" fill="currentColor">218</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">registry_deprecated</text> <rect x="210" y="104" width="41" height="26" rx="2" fill="currentColor"><title>registry_deprecated: 166</title></rect> <text x="259" y="121.0" fill="currentColor">166</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">GitHub repo archived</text> <rect x="210" y="138" width="31" height="26" rx="2" fill="currentColor"><title>GitHub repo archived: 126</title></rect> <text x="249" y="155.0" fill="currentColor">126</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">npm package missing</text> <rect x="210" y="172" width="6" height="26" rx="2" fill="currentColor"><title>npm package missing: 25</title></rect> <text x="224" y="189.0" fill="currentColor">25</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">PyPI package missing</text> <rect x="210" y="206" width="4" height="26" rx="2" fill="currentColor"><title>PyPI package missing: 15</title></rect> <text x="222" y="223.0" fill="currentColor">15</text></svg> View as table

| Problem | Servers |
| --- | --- |
| GitHub repo gone (deleted/private) | 1,880 |
| No repo push in 6+ months | 299 |
| npm package deprecated | 218 |
| registry\_deprecated | 166 |
| GitHub repo archived | 126 |
| npm package missing | 25 |
| PyPI package missing | 15 |

3 — Popularity is brutally concentrated

## 127 servers have 1,000+ stars; 9,207 have fewer than 10

<svg viewBox="0 0 760 514" role="img" aria-label="Most-starred servers" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">mcp-server</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>mcp-server: 79,539</title></rect> <text x="678" y="19.0" fill="currentColor">79,539</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">labelhead-artist-momentum</text> <rect x="210" y="36" width="422" height="26" rx="2" fill="currentColor"><title>labelhead-artist-momentum: 72,973</title></rect> <text x="640" y="53.0" fill="currentColor">72,973</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">Scrapling</text> <rect x="210" y="70" width="396" height="26" rx="2" fill="currentColor"><title>Scrapling: 68,518</title></rect> <text x="614" y="87.0" fill="currentColor">68,518</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">claude-flow</text> <rect x="210" y="104" width="367" height="26" rx="2" fill="currentColor"><title>claude-flow: 63,401</title></rect> <text x="585" y="121.0" fill="currentColor">63,401</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">mcp</text> <rect x="210" y="138" width="356" height="26" rx="2" fill="currentColor"><title>mcp: 61,511</title></rect> <text x="574" y="155.0" fill="currentColor">61,511</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">context7</text> <rect x="210" y="172" width="340" height="26" rx="2" fill="currentColor"><title>context7: 58,711</title></rect> <text x="558" y="189.0" fill="currentColor">58,711</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">tldraw</text> <rect x="210" y="206" width="281" height="26" rx="2" fill="currentColor"><title>tldraw: 48,609</title></rect> <text x="499" y="223.0" fill="currentColor">48,609</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">mcp</text> <rect x="210" y="240" width="278" height="26" rx="2" fill="currentColor"><title>mcp: 48,084</title></rect> <text x="496" y="257.0" fill="currentColor">48,084</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">chrome-devtools-mcp</text> <rect x="210" y="274" width="267" height="26" rx="2" fill="currentColor"><title>chrome-devtools-mcp: 46,199</title></rect> <text x="485" y="291.0" fill="currentColor">46,199</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">mcp-server</text> <rect x="210" y="308" width="247" height="26" rx="2" fill="currentColor"><title>mcp-server: 42,650</title></rect> <text x="465" y="325.0" fill="currentColor">42,650</text> <text x="202" y="359.0" text-anchor="end" fill="currentColor">mcp-server-browser</text> <rect x="210" y="342" width="218" height="26" rx="2" fill="currentColor"><title>mcp-server-browser: 37,767</title></rect> <text x="436" y="359.0" fill="currentColor">37,767</text> <text x="202" y="393.0" text-anchor="end" fill="currentColor">mcp-server-commands</text> <rect x="210" y="376" width="218" height="26" rx="2" fill="currentColor"><title>mcp-server-commands: 37,767</title></rect> <text x="436" y="393.0" fill="currentColor">37,767</text> <text x="202" y="427.0" text-anchor="end" fill="currentColor">mcp-server-filesystem</text> <rect x="210" y="410" width="218" height="26" rx="2" fill="currentColor"><title>mcp-server-filesystem: 37,767</title></rect> <text x="436" y="427.0" fill="currentColor">37,767</text> <text x="202" y="461.0" text-anchor="end" fill="currentColor">mcp-server-search</text> <rect x="210" y="444" width="218" height="26" rx="2" fill="currentColor"><title>mcp-server-search: 37,767</title></rect> <text x="436" y="461.0" fill="currentColor">37,767</text> <text x="202" y="495.0" text-anchor="end" fill="currentColor">mcp</text> <rect x="210" y="478" width="205" height="26" rx="2" fill="currentColor"><title>mcp: 35,361</title></rect> <text x="423" y="495.0" fill="currentColor">35,361</text></svg> View as table

| Server | Stars |
| --- | --- |
| mcp-server | 79,539 |
| labelhead-artist-momentum | 72,973 |
| Scrapling | 68,518 |
| claude-flow | 63,401 |
| mcp | 61,511 |
| context7 | 58,711 |
| tldraw | 48,609 |
| mcp | 48,084 |
| chrome-devtools-mcp | 46,199 |
| mcp-server | 42,650 |
| mcp-server-browser | 37,767 |
| mcp-server-commands | 37,767 |
| mcp-server-filesystem | 37,767 |
| mcp-server-search | 37,767 |
| mcp | 35,361 |

Caveat the census surfaced: star counts follow the repo each registry entry *declares*, and entries can declare any repo — 61 repos are declared by 5+ different servers (one by 126). The dataset ships a `repo_shared_count` field so you can filter these.

## Most-installed npm servers (weekly downloads)

<svg viewBox="0 0 760 514" role="img" aria-label="Top npm weekly downloads" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">mcp-server</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>mcp-server: 7,418</title></rect> <text x="678" y="19.0" fill="currentColor">7,418</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">strajkpolski-mcp</text> <rect x="210" y="36" width="112" height="26" rx="2" fill="currentColor"><title>strajkpolski-mcp: 1,804</title></rect> <text x="330" y="53.0" fill="currentColor">1,804</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">mcp</text> <rect x="210" y="70" width="106" height="26" rx="2" fill="currentColor"><title>mcp: 1,713</title></rect> <text x="324" y="87.0" fill="currentColor">1,713</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">adeu</text> <rect x="210" y="104" width="97" height="26" rx="2" fill="currentColor"><title>adeu: 1,568</title></rect> <text x="315" y="121.0" fill="currentColor">1,568</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">1claw-mcp</text> <rect x="210" y="138" width="97" height="26" rx="2" fill="currentColor"><title>1claw-mcp: 1,567</title></rect> <text x="315" y="155.0" fill="currentColor">1,567</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">ghl-command</text> <rect x="210" y="172" width="97" height="26" rx="2" fill="currentColor"><title>ghl-command: 1,562</title></rect> <text x="315" y="189.0" fill="currentColor">1,562</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">mastyf.ai</text> <rect x="210" y="206" width="64" height="26" rx="2" fill="currentColor"><title>mastyf.ai: 1,030</title></rect> <text x="282" y="223.0" fill="currentColor">1,030</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">cool-workflow</text> <rect x="210" y="240" width="63" height="26" rx="2" fill="currentColor"><title>cool-workflow: 1,019</title></rect> <text x="281" y="257.0" fill="currentColor">1,019</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">google-workspace</text> <rect x="210" y="274" width="52" height="26" rx="2" fill="currentColor"><title>google-workspace: 831</title></rect> <text x="270" y="291.0" fill="currentColor">831</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">voidmob-mcp</text> <rect x="210" y="308" width="49" height="26" rx="2" fill="currentColor"><title>voidmob-mcp: 794</title></rect> <text x="267" y="325.0" fill="currentColor">794</text> <text x="202" y="359.0" text-anchor="end" fill="currentColor">gblin-mcp-server</text> <rect x="210" y="342" width="45" height="26" rx="2" fill="currentColor"><title>gblin-mcp-server: 732</title></rect> <text x="263" y="359.0" fill="currentColor">732</text> <text x="202" y="393.0" text-anchor="end" fill="currentColor">mcp-server-sfmc</text> <rect x="210" y="376" width="38" height="26" rx="2" fill="currentColor"><title>mcp-server-sfmc: 608</title></rect> <text x="256" y="393.0" fill="currentColor">608</text> <text x="202" y="427.0" text-anchor="end" fill="currentColor">pedra-mcp</text> <rect x="210" y="410" width="34" height="26" rx="2" fill="currentColor"><title>pedra-mcp: 553</title></rect> <text x="252" y="427.0" fill="currentColor">553</text> <text x="202" y="461.0" text-anchor="end" fill="currentColor">mcp-server-scf</text> <rect x="210" y="444" width="32" height="26" rx="2" fill="currentColor"><title>mcp-server-scf: 523</title></rect> <text x="250" y="461.0" fill="currentColor">523</text> <text x="202" y="495.0" text-anchor="end" fill="currentColor">elisym</text> <rect x="210" y="478" width="31" height="26" rx="2" fill="currentColor"><title>elisym: 499</title></rect> <text x="249" y="495.0" fill="currentColor">499</text></svg> View as table

| Server | Weekly downloads |
| --- | --- |
| mcp-server | 7,418 |
| strajkpolski-mcp | 1,804 |
| mcp | 1,713 |
| adeu | 1,568 |
| 1claw-mcp | 1,567 |
| ghl-command | 1,562 |
| mastyf.ai | 1,030 |
| cool-workflow | 1,019 |
| google-workspace | 831 |
| voidmob-mcp | 794 |
| gblin-mcp-server | 732 |
| mcp-server-sfmc | 608 |
| pedra-mcp | 553 |
| mcp-server-scf | 523 |
| elisym | 499 |

4 — What gets built (and where the gaps are)

<svg viewBox="0 0 760 412" role="img" aria-label="Servers by category" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">dev-tools</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>dev-tools: 11,697</title></rect> <text x="678" y="19.0" fill="currentColor">11,697</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">ai-ml</text> <rect x="210" y="36" width="76" height="26" rx="2" fill="currentColor"><title>ai-ml: 1,943</title></rect> <text x="294" y="53.0" fill="currentColor">1,943</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">api-integration</text> <rect x="210" y="70" width="66" height="26" rx="2" fill="currentColor"><title>api-integration: 1,672</title></rect> <text x="284" y="87.0" fill="currentColor">1,672</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">security</text> <rect x="210" y="104" width="34" height="26" rx="2" fill="currentColor"><title>security: 864</title></rect> <text x="252" y="121.0" fill="currentColor">864</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">finance</text> <rect x="210" y="138" width="33" height="26" rx="2" fill="currentColor"><title>finance: 847</title></rect> <text x="251" y="155.0" fill="currentColor">847</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">communication</text> <rect x="210" y="172" width="21" height="26" rx="2" fill="currentColor"><title>communication: 544</title></rect> <text x="239" y="189.0" fill="currentColor">544</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">media</text> <rect x="210" y="206" width="21" height="26" rx="2" fill="currentColor"><title>media: 536</title></rect> <text x="239" y="223.0" fill="currentColor">536</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">files-documents</text> <rect x="210" y="240" width="18" height="26" rx="2" fill="currentColor"><title>files-documents: 461</title></rect> <text x="236" y="257.0" fill="currentColor">461</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">data-analytics</text> <rect x="210" y="274" width="16" height="26" rx="2" fill="currentColor"><title>data-analytics: 406</title></rect> <text x="234" y="291.0" fill="currentColor">406</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">databases</text> <rect x="210" y="308" width="16" height="26" rx="2" fill="currentColor"><title>databases: 399</title></rect> <text x="234" y="325.0" fill="currentColor">399</text> <text x="202" y="359.0" text-anchor="end" fill="currentColor">weather-geo</text> <rect x="210" y="342" width="15" height="26" rx="2" fill="currentColor"><title>weather-geo: 377</title></rect> <text x="233" y="359.0" fill="currentColor">377</text> <text x="202" y="393.0" text-anchor="end" fill="currentColor">productivity</text> <rect x="210" y="376" width="12" height="26" rx="2" fill="currentColor"><title>productivity: 302</title></rect> <text x="230" y="393.0" fill="currentColor">302</text></svg> View as table

| Category | Servers |
| --- | --- |
| dev-tools | 11,697 |
| ai-ml | 1,943 |
| api-integration | 1,672 |
| security | 864 |
| finance | 847 |
| communication | 544 |
| media | 536 |
| files-documents | 461 |
| data-analytics | 406 |
| databases | 399 |
| weather-geo | 377 |
| productivity | 302 |

Cross this with the health data and the gap analysis writes itself: crowded categories full of abandoned servers are consolidation opportunities; thin categories with high download leaders are underserved demand.

5 — Name collisions

## 45 names are used by 5+ different servers

The same terminal name (e.g. `github`, `weather`) recurs across namespaces — a real vetting hazard: picking the wrong `filesystem` server is one typo away. Collision counts per name ship in the dataset.

<svg viewBox="0 0 760 412" role="img" aria-label="Most-collided server names" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">mcp</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>mcp: 638</title></rect> <text x="678" y="19.0" fill="currentColor">638</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">mcpserver</text> <rect x="210" y="36" width="226" height="26" rx="2" fill="currentColor"><title>mcpserver: 314</title></rect> <text x="444" y="53.0" fill="currentColor">314</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">server</text> <rect x="210" y="70" width="23" height="26" rx="2" fill="currentColor"><title>server: 32</title></rect> <text x="241" y="87.0" fill="currentColor">32</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">catalog</text> <rect x="210" y="104" width="14" height="26" rx="2" fill="currentColor"><title>catalog: 19</title></rect> <text x="232" y="121.0" fill="currentColor">19</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">weather</text> <rect x="210" y="138" width="12" height="26" rx="2" fill="currentColor"><title>weather: 16</title></rect> <text x="230" y="155.0" fill="currentColor">16</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">api</text> <rect x="210" y="172" width="10" height="26" rx="2" fill="currentColor"><title>api: 14</title></rect> <text x="228" y="189.0" fill="currentColor">14</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">marketplace</text> <rect x="210" y="206" width="8" height="26" rx="2" fill="currentColor"><title>marketplace: 11</title></rect> <text x="226" y="223.0" fill="currentColor">11</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">docs</text> <rect x="210" y="240" width="7" height="26" rx="2" fill="currentColor"><title>docs: 10</title></rect> <text x="225" y="257.0" fill="currentColor">10</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">library</text> <rect x="210" y="274" width="7" height="26" rx="2" fill="currentColor"><title>library: 10</title></rect> <text x="225" y="291.0" fill="currentColor">10</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">gateway</text> <rect x="210" y="308" width="7" height="26" rx="2" fill="currentColor"><title>gateway: 10</title></rect> <text x="225" y="325.0" fill="currentColor">10</text> <text x="202" y="359.0" text-anchor="end" fill="currentColor">memory</text> <rect x="210" y="342" width="7" height="26" rx="2" fill="currentColor"><title>memory: 10</title></rect> <text x="225" y="359.0" fill="currentColor">10</text> <text x="202" y="393.0" text-anchor="end" fill="currentColor">emailmcp</text> <rect x="210" y="376" width="7" height="26" rx="2" fill="currentColor"><title>emailmcp: 10</title></rect> <text x="225" y="393.0" fill="currentColor">10</text></svg> View as table

| Name (normalized) | Servers using it |
| --- | --- |
| mcp | 638 |
| mcpserver | 314 |
| server | 32 |
| catalog | 19 |
| weather | 16 |
| api | 14 |
| marketplace | 11 |
| docs | 10 |
| library | 10 |
| gateway | 10 |
| memory | 10 |
| emailmcp | 10 |

6 — Licenses & languages

<svg viewBox="0 0 760 344" role="img" aria-label="Top licenses" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">MIT</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>MIT: 7,169</title></rect> <text x="678" y="19.0" fill="currentColor">7,169</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">Apache-2.0</text> <rect x="210" y="36" width="63" height="26" rx="2" fill="currentColor"><title>Apache-2.0: 981</title></rect> <text x="281" y="53.0" fill="currentColor">981</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">NOASSERTION</text> <rect x="210" y="70" width="57" height="26" rx="2" fill="currentColor"><title>NOASSERTION: 888</title></rect> <text x="275" y="87.0" fill="currentColor">888</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">AGPL-3.0</text> <rect x="210" y="104" width="10" height="26" rx="2" fill="currentColor"><title>AGPL-3.0: 154</title></rect> <text x="228" y="121.0" fill="currentColor">154</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">GPL-3.0</text> <rect x="210" y="138" width="3" height="26" rx="2" fill="currentColor"><title>GPL-3.0: 52</title></rect> <text x="221" y="155.0" fill="currentColor">52</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">BSD-3-Clause</text> <rect x="210" y="172" width="2" height="26" rx="2" fill="currentColor"><title>BSD-3-Clause: 31</title></rect> <text x="220" y="189.0" fill="currentColor">31</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">ISC</text> <rect x="210" y="206" width="2" height="26" rx="2" fill="currentColor"><title>ISC: 18</title></rect> <text x="220" y="223.0" fill="currentColor">18</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">MPL-2.0</text> <rect x="210" y="240" width="2" height="26" rx="2" fill="currentColor"><title>MPL-2.0: 10</title></rect> <text x="220" y="257.0" fill="currentColor">10</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">MIT-0</text> <rect x="210" y="274" width="2" height="26" rx="2" fill="currentColor"><title>MIT-0: 7</title></rect> <text x="220" y="291.0" fill="currentColor">7</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">BSD-2-Clause</text> <rect x="210" y="308" width="2" height="26" rx="2" fill="currentColor"><title>BSD-2-Clause: 5</title></rect> <text x="220" y="325.0" fill="currentColor">5</text></svg> View as table

| License | Repos |
| --- | --- |
| MIT | 7,169 |
| Apache-2.0 | 981 |
| NOASSERTION | 888 |
| AGPL-3.0 | 154 |
| GPL-3.0 | 52 |
| BSD-3-Clause | 31 |
| ISC | 18 |
| MPL-2.0 | 10 |
| MIT-0 | 7 |
| BSD-2-Clause | 5 |

<svg viewBox="0 0 760 344" role="img" aria-label="Primary languages" font-family="ui-monospace,SF Mono,Menlo,monospace" font-size="12"><text x="202" y="19.0" text-anchor="end" fill="currentColor">TypeScript</text> <rect x="210" y="2" width="460" height="26" rx="2" fill="currentColor"><title>TypeScript: 4,696</title></rect> <text x="678" y="19.0" fill="currentColor">4,696</text> <text x="202" y="53.0" text-anchor="end" fill="currentColor">Python</text> <rect x="210" y="36" width="264" height="26" rx="2" fill="currentColor"><title>Python: 2,697</title></rect> <text x="482" y="53.0" fill="currentColor">2,697</text> <text x="202" y="87.0" text-anchor="end" fill="currentColor">JavaScript</text> <rect x="210" y="70" width="169" height="26" rx="2" fill="currentColor"><title>JavaScript: 1,727</title></rect> <text x="387" y="87.0" fill="currentColor">1,727</text> <text x="202" y="121.0" text-anchor="end" fill="currentColor">Go</text> <rect x="210" y="104" width="28" height="26" rx="2" fill="currentColor"><title>Go: 288</title></rect> <text x="246" y="121.0" fill="currentColor">288</text> <text x="202" y="155.0" text-anchor="end" fill="currentColor">Rust</text> <rect x="210" y="138" width="19" height="26" rx="2" fill="currentColor"><title>Rust: 199</title></rect> <text x="237" y="155.0" fill="currentColor">199</text> <text x="202" y="189.0" text-anchor="end" fill="currentColor">HTML</text> <rect x="210" y="172" width="11" height="26" rx="2" fill="currentColor"><title>HTML: 108</title></rect> <text x="229" y="189.0" fill="currentColor">108</text> <text x="202" y="223.0" text-anchor="end" fill="currentColor">C#</text> <rect x="210" y="206" width="8" height="26" rx="2" fill="currentColor"><title>C#: 81</title></rect> <text x="226" y="223.0" fill="currentColor">81</text> <text x="202" y="257.0" text-anchor="end" fill="currentColor">Shell</text> <rect x="210" y="240" width="7" height="26" rx="2" fill="currentColor"><title>Shell: 76</title></rect> <text x="225" y="257.0" fill="currentColor">76</text> <text x="202" y="291.0" text-anchor="end" fill="currentColor">Java</text> <rect x="210" y="274" width="3" height="26" rx="2" fill="currentColor"><title>Java: 28</title></rect> <text x="221" y="291.0" fill="currentColor">28</text> <text x="202" y="325.0" text-anchor="end" fill="currentColor">Dockerfile</text> <rect x="210" y="308" width="3" height="26" rx="2" fill="currentColor"><title>Dockerfile: 26</title></rect> <text x="221" y="325.0" fill="currentColor">26</text></svg> View as table

| Language | Repos |
| --- | --- |
| TypeScript | 4,696 |
| Python | 2,697 |
| JavaScript | 1,727 |
| Go | 288 |
| Rust | 199 |
| HTML | 108 |
| C# | 81 |
| Shell | 76 |
| Java | 28 |
| Dockerfile | 26 |

7 — Method

Enumeration: official MCP registry public API (all pages, 2026-07-07), deduplicated to latest versions. Enrichment: GitHub GraphQL (10,989 repos), npm registry + downloads API, PyPI JSON API. Health verdicts are facts with evidence fields — "unknown" is an honest verdict, never a guess. No personal data. Full field list and the complete dataset (SQLite/CSV/JSON): [the MCP Census](https://mcpcensus.pages.dev/), $19.

Compiled overnight by Claude (an AI agent), supervised by a human. Corrections: [framedrabbit@gmail.com](mailto:framedrabbit@gmail.com).