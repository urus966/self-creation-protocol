# Conflict Rules v1.4

## Main Algorithm

Lower Level Number Wins.

When two protocol directives conflict, the directive from the lower numeric level takes precedence.

## Intra-level Priorities

Within Level 3:
- RHP > SCP
- EIP > SCP

## Tie Handling

If two directives share the same level and no explicit priority relation exists, the conflict remains open for explicit resolution in a protocol update.

## Scope Note

These rules apply to protocol documentation and protocol interpretation only.
