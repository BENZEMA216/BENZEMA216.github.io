[Home](https://astrix.security/) » » State of MCP Server Security 2025: 5,200 Servers, Credential Risks, and an Open-Source Fix

## State of MCP Server Security 2025: 5,200 Servers, Credential Risks, and an Open-Source Fix

![Astrix logo with a pink padlock and password fields, representing leading NHI security and service account protection.](https://astrix.security/wp-content/uploads/2025/10/State-of-MCP-Server-Security-2025_Blog_370x220.png.webp)

***This blog post shares the findings from the Astrix Research team’s large-scale “State of MCP Server Security 2025” research project. We analyzed over 5,200 unique, open-source Model Context Protocol (MCP) server implementations to understand how they manage credentials and what this means for the security of the growing AI agent ecosystem.***

The research findings were eye-opening: the vast majority of servers (88%) require credentials, but over half (53%) rely on insecure, long-lived static secrets, such as API keys and Personal Access Tokens (PATs). Meanwhile, modern and secure authentication methods, such as OAuth, are lagging in adoption at just 8.5%, confirming a major security risk across the ecosystem.  
To provide an immediate solution to this foundational problem, **Astrix is releasing the [MCP Secret Wrapper](https://github.com/astrix-security/mcp-secret-wrapper/)**, a new open-source tool. This tool wraps around any MCP server to pull secrets directly from a secure vault at runtime, ensuring that no sensitive secrets are exposed on host machines.

## Unpacking the State of MCP Security Research 2025: The Full Story

The [AI agent era](https://astrix.security/glossary/agentic-ai/) is here, powered by the [Model Context Protocol (MCP)](https://astrix.security/glossary/model-context-protocol-mcp/). When the MCP specification was first released, the Astrix Research team, like many, saw its immense potential. We also saw a potential blind spot. While the protocol empowers servers to make API requests, the initial examples relied on a dangerously insecure foundation: the use of hardcoded, overly permissive, and non-expiring credentials, such as classic Personal Access Tokens (PATs) or [API keys](https://astrix.security/glossary/what-is-an-api-key/). We feared this was creating a crack in the foundation of the new AI-powered world.

Months later, our initial fears have proven to be more than justified. With unofficial registries (e.g., mcp.so) indexing over 16,000 MCP servers, it’s clear the ecosystem is vast and sprawling. But its scale also reveals a deeper problem: the foundational approach to identities is broken, creating systemic risk regardless of how the ecosystem is organized.  
To understand the true scale of this risk, the Astrix Research team launched a large-scale “ **State of MCP Server Security 2025** ” research project. We analyzed over 5,000 unique open-source MCP server implementations to answer a set of fundamental questions:

- How are these MCP servers really managing credentials?
- What is the true prevalence of high-risk static secrets versus modern secure protocols?
- What does this mean for the security of the enterprises that rely on them?

## Key Findings from the MCP Server Security Research.

- Approximately 88% of servers require credentials.
- Over half (53%) rely on static API keys or Personal Access Tokens (PATs), which are long-lived and rarely rotated.
- Only 8.5% use OAuth, the modern, preferred method for secure delegation.
- 79% of API keys are passed via simple environment variables.
- A total of 20,000 MCP server implementations on GitHub

That is why, alongside this research, **Astrix is releasing [MCP Secret Wrapper](https://github.com/astrix-security/mcp-secret-wrapper)**, a new open-source tool designed to eliminate this foundational security flaw. Below, we share our full findings and methodology. It is a data-driven look into the *secrets* of MCP —a story of explosive growth and security implications.

## Why Examine Credential Management in Model Context Protocol Servers?

### The origin

In November of last year, Anthropic released the Model Context Protocol, a new method for augmenting AI assistants with the ability to fetch data and take actions. Effectively, this capability transforms AI assistants into full-fledged agents. When the protocol specification dropped, the Astrix research team immediately began inspecting it.

One of our first questions was: if MCP Servers are responsible for making API requests, where are the credentials stored? The initial specification didn’t mention this at all. What about the identities these servers need?

To our concern, almost all initial sample servers released to showcase MCP’s capabilities relied on the simplest, most broadly-permissive, never-expiring, worst type of [NHIs](https://astrix.security/glossary/what-are-non-human-identities/):

- GitHub supporting classic PATs
- GitLab supporting PATs
- Postgres access with basic username and password

Back then, MCP was just another initiative. We were excited about its capabilities but worried about the identities servers would use. We figured that by the time the framework was fully adopted and running, the identity perspective would mature significantly.

### Back to the present

This brings us to the present. While the official examples were corrected, the pattern they established had already taken hold.

The MCP framework has become a central topic in AI and a main driver of AI Agent adoption, and thousands of developers, following those initial patterns, have built and published their own servers. Organizations are rapidly adopting MCP servers to stay current. Besides the official launch of the [MCP Server registry](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/), unofficial marketplaces have indexed upwards of 17,000 servers!

Yet, with the expansion of the MCP ecosystem, the vast majority of the MCP servers still followed the original, insecure methods for handling identity.

Naturally, we wondered if our initial fears had materialized. Every good research begins with asking questions, and here were ours:

- How many *real* open-source MCP Server implementations exist? (GitHub is riddled with forks and example/tutorial servers). How close is the indexed number to the real count?
- How many servers need an identity or credentials to operate? (Some MCP Servers operate locally and use the user’s own security context such as [filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem), [playwright](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories), and more)
- What types of NHIs are servers using? What credentials enable authentication?
- How are credentials provided to the server? (Hard-coded, configuration files, environment variables, etc.)
- Are tools easily separated into sensitive and non-sensitive categories? (Read and write operations, for instance).

## Research Findings

### Finding 1: Estimating the True Number of MCP Servers

First, let’s talk about the number of real servers we managed to find. Our hunch proved somewhat correct, with a 30% drop between the total number of repositories downloaded and those implementing real MCP Servers.

![MCP Research Scope](https://astrix.security/wp-content/uploads/2025/10/image.png)

MCP Research Scope

Based on our analysis (see Appendix 1), we estimate that there are a total of 20,000 repositories in GitHub implementing MCP servers. This puts the amount of servers we collected at ~19% of total implementations. This ensures deviation in our analysis is relatively small (also leaning into the side of caution, given that we downloaded highly-starred repositories) and instills confidence that our results closely reflect reality.

### Finding 2: 88% of MCP Servers Require Credentials

As shown on the chart above, a high percentage of servers mentioned credentials (88%!) This finding provided an indicator of a trend: credential usage is the norm for MCP servers, pointing to a broad reliance on accessing protected data and services.

*However, this binary outcome (using a credential or not) is most likely to be inaccurately judged by the LLM, even at a large scale. The credential type analysis (where the analyzer had to categorize credentials into specific buckets) paints a slightly different picture*.

### Finding 3: Static Credentials Dominate, OAuth Lags Behind

The crux of our research – what types of NHIs do MCP Servers use? We allowed the analyzer to categorize credentials into 4 buckets:

#### API Key

Typically a single string providing direct API access, generated without direct relation to an identity.

#### Access Tokens (ATs) and Personal Access Tokens (PATs)

Tokens usually provided to users for API queries, scoped to their access. Very common in code repositories like GitHub and GitLab.

#### OAuth

While not every downstream platform supports OAuth, it’s considered best practice. It allows users to delegate access to the MCP Server while creating a dedicated NHI (usually as a new app with a client identifier). Servers implementing OAuth must be mature, as they might need to manage different tokens for different users, considering AI Agents utilizing MCP can serve multiple users simultaneously.

#### Unknown

So the analyzer isn’t forced to choose from the above.

And the results… 🥁

![Credential Types Mentioned in READMEs (Share of Servers) graph](https://astrix.security/wp-content/uploads/2025/10/image-1.png)

Credential Types Mentioned in READMEs (Share of Servers) graph

A total of ~ **53%** of servers utilize static credentials: API keys and access tokens. This means these credentials are long-lived, rarely rotated, and stored in configuration and.env files across multiple systems today, confirming a major security risk!

Meanwhile, only **~8.5%** of servers use OAuth. While adoption is growing, it’s still far behind, despite being the best approach for security.

Finally, **26.4%** of servers landed in the “Unknown” bucket while still mentioning credentials. This can’t solely be explained by servers that don’t *actually* require credentials but mention them in passing in their `README.md`. It points to potential difficulty for the LLM-based analyzer to correctly predict credential types.

### Finding 4: 79% of MCP Servers Store API Keys in Environment Variables

What about credential storage methods? The LLM-based analyzer struggled to understand specific storage types – configuration files usually mean credentials are passed into environment variables and can be provided that way, making it difficult to infer possible methods. However, binary analysis proved semi-successful, indicating whether servers only expect credentials via environment variables or configuration files, or support more advanced methods.

The analysis above pertains only to API Keys, with a significant portion (79%) of MCP Servers simply obtaining them from environment variables.

![API Keys - Storage Methods graph](https://astrix.security/wp-content/uploads/2025/10/image-2.png)

API Keys - Storage Methods graph

Unfortunately, this question proved too advanced for the LLM-based analyzer to answer concretely. Defining what constitutes a sensitive tool isn’t easy – while we focused on the API call made at the end and whether it accesses or acts on sensitive resources, this isn’t easily identified by examining tool definitions.

### Finding 5: Distinguishing Sensitive MCP Tools Requires Deeper Analysis

Defining whether a tool is sensitive (e.g., performs write vs. read operations) is not easily identified by examining tool definitions in a `README` file. We believe definitive answers require code-level analysis and leave this for future research.

*(If you take this on, let us know! We’d be very interested in the results and happy to update this section with a reference).*

## What Can Be Done? Enter: Astrix’s MCP Secret Wrapper

Given the findings in our **State of MCP Server Security 2025** research, the path forward is clear. MCP Servers ***must use*** NHIs to access protected enterprise resources, and we showed that implementations today overwhelmingly rely on coarse, long-lived secrets exposed statically in configuration files.

So, really, what can you do about it? Well, today, you can do something!

Today, **Astrix is releasing the [MCP Secret Wrapper](https://github.com/astrix-security/mcp-secret-wrapper/)**, an open-source project that smartly and simply wraps around ***any*** MCP server. Instead of relying on static credentials in configuration files, it pulls the relevant [secret](https://astrix.security/glossary/what-is-a-secret/) from a vault (currently, the project supports AWS Secrets Manager) and starts the designated MCP server with the secret injected into its environment variables. Utilizing this tool ensures no exposed secrets exist on any machine hosting MCP servers.

Removing static credentials is just one piece of the puzzle – it doesn’t address the issue of secrets being coarse or their longevity. However, you *can* apply auto-rotation policies to vaulted secrets.

Since the secret is pulled dynamically, the MCP server remains completely unaffected and continues operating happily. Of course, rotation isn’t simple, and this is where Astrix can help!

Astrix’s [Agent Control Plane (ACP)](https://astrix.security/product/deploy-and-provisioins-ai-agent-discovery/) is the industry’s first solution designed to deploy secure-by-design AI agents across the enterprise. With ACP, every AI agent receives short-lived, precisely scoped credentials and just-in-time access, based on least privilege principles, which eliminates access chaos and reduces compliance risk.

> **[See Astrix in action](https://astrix.security/see-astrix-in-action/)** or request a **[live demo](https://astrix.security/schedule-a-live-demo/)** to learn how we help organizations discover, secure, and deploy AI agents responsibly across the enterprise.

## Research Methodology

### Identifying Real MCP Server Implementations

Indexing and searching through billions of code repositories is a monumental feat. If you’ve ever tried GitHub’s [code search](https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax), you know how extensive yet quick it is – supporting even complicated regex while returning thousands of results in seconds.

However, the API-based search is different. It only supports the [legacy code search](https://docs.github.com/en/search-github/searching-on-github/searching-code) mode, and for [repositories](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories), it can only search through their owner, name, description, and `README.md` file. It has very restrictive rate limits, but the real difficulty is that *it only returns the first 1,000 results per search query.*

We wanted to search for MCP Server implementations. There’s no simple tag or common convention to match against. Given the search API’s limitations, we had to think creatively. Here are the techniques we used:

1. Adding boolean constraints to narrow down results, such as specific programming languages with MCP SDK support: `language:Python, language:TypeScript`
2. Searching for very specific strings – like matching the (relatively long and distinct) configuration file for Claude desktop: `claude_desktop_config.json`
3. Per programming language with MCP SDK support – matching library imports or usage patterns: `using ModelContextProtocol.Server for C#`
4. Ordering results by star count. This ensures the top 1,000 results are more likely to be actual MCP Server implementations

By combining these techniques, we successfully extracted real MCP Server implementations, detecting 5,205 distinct GitHub repositories and downloading their `README.md` files.

### Analyzing README.md files

Analyzing thousands of different `README.md` files required an efficient, scalable approach. We were confident these files contained the answers to our research questions, as they usually include enough information to determine:

1. Whether the repository implements a real MCP Server
2. The tools made available by the server
3. The expected identity and credentials used by the server
4. Where credentials should be placed and how they’re provided to the server

But `README.md` files are written for humans, not code. Thankfully, we live in the AI era, so our task was to write an effective prompt and use an LLM for the large-scale analysis.

We instructed the AI to detect whether the `README.md` belongs to a real MCP Server implementation (as opposed to a sample server, fork, etc.), identify what types of credentials are used (from a predefined set), how the server consumes credentials, main features offered, types of tools used, and finally, provide a confidence score for the analysis.

## Appendix

### Analyzing Total MCP Server Count Under GitHub API Limitation

Since GitHub search queries return the total number of results (even though only 1,000 are available), we estimated approximately 50,000 implementations related to MCP on GitHub. Taking the 30% drop at face value would mean 35,000 MCP Servers exist today.

However, we believe the number is significantly lower. We observed a 30% drop, but our data was skewed toward highly starred repositories, which are more likely to be legitimate. (If sampled randomly, you’d expect many more repositories with fewer than 10 stars)

![Stars distribution for scanned MCP repositories graph](https://astrix.security/wp-content/uploads/2025/10/image-3.png)

Stars distribution for scanned MCP repositories graph

To accurately predict the number of MCP Server implementations, we’d need to sample randomly from the 50,000. However, GitHub doesn’t offer an “order by randomness” feature. If we had to estimate, approximately 20,000 MCP Server implementations exist, making third-party MCP Server registries quite close to indexing every possible server!