- Commit summaries must be in the following format `<type>(<scope>): <description>`.
  - type - `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
  - scope - file affected, or general scope of commit
  - description - Your commit summary

- Write tests that cover your changes

- Make sure `npm run lint` and `npm test` both pass before submitting PR.

- Add docs if appropriate

- Add yourself as Contributor in README.md. If you do not know the `id` for your account, it can be found at `https://api.github.com/users/<username>`

  ```html
  <td align="center">
    <img
      width="150"
      height="150"
      src="https://avatars.githubusercontent.com/u/{{ id }}?v=3&s=150">
    <br />
    <a href="https://github.com/{{ login }}">{{ Name }}</a>
  </td>
  ```
