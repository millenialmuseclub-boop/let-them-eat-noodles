# App Review Notes

For the App Store / Google Play reviewer.

- **No account or login required.** All content is available immediately on launch — there is no sign-in screen anywhere in the app.
- **Encyclopedia**: bottom tab "Discover" → "Explore the Encyclopedia," or top-level route `/encyclopedia`. Browse 51 canonical noodle dishes by region, preparation style, or noodle type.
- **Recipes**: tap any dish in the Encyclopedia to open its detail page — the structured recipe (ingredients, numbered method, notes) is on the same page, below the dish's cultural/historical background.
- **Atlas**: bottom tab area → "Atlas" (`/atlas`). A region → country → place → dish browsing structure; no map interaction is required to use it.
- **Workshop**: bottom tab "Workshop" (`/workshop`). Educational noodle-making lessons ("Labs") and a deterministic cooking-problem Troubleshooter (`/workshop/troubleshooter`) — no chatbot, no AI-generated advice.
- **Sommelier FIND**: bottom tab "Find" (`/sommelier`). Move the sliders and pick flavor tags to get 3 dish matches with plain-language reasons for each match. Fully deterministic — no network call, no AI.
- **Twirl**: bottom tab "Twirl" (`/twirl`). Original editorial writing about noodle culture and technique.
- **My Noodles**: reached via the "My Noodles" icon in the top navigation bar (not a bottom tab), or `/my-noodles`. Entirely local to the device via browser localStorage — nothing is transmitted anywhere, no account is created or required, and no data survives an app reinstall/data-clear.
- **Curated Kitchen** (`/curated-kitchen`) and any in-context product links inside Workshop labs open external merchant websites in the system browser via standard outbound links. These are affiliate links (clearly labeled with a disclosure on the Curated Kitchen page); the app itself never processes payment or collects any commerce data.
- **No user-generated content, no social features, no comments, no sharing, no push notifications.**
