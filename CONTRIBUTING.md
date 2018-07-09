- Commit summaries must be in the following format `<type>(<scope>): <description>`
  - type - `ci`, `fix`, `feat`, `docs`, `test`, `perf`, `style`, `build`, `chore`, `revert`, `refactor`
  - scope - file affected e.g (`fix(lib/index): <description>`), or general scope of commit
  - description - Your commit summary
- Add docs if appropriate
- Write tests that cover your changes
- Make sure `npm run lint` and `npm test` both pass before submitting a PR
- Add yourself as a contributor in `README.md` && `package.json`

**README.md**
```html
<td align="center">
  <img
    width="150"
    height="150"
    src="https://github.com/{{ user }}.png?v=3&s=150">
  <br />
  <a href="https://github.com/{{ user }}">{{ Name }}</a>
</td>
```

**package.json**
```
{
  "contributors": [
    "{{ firstname }} {{ lastname }} <email>"
  ]
}
```  
