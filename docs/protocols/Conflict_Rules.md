# Conflict Rules v1.4

## Main Algorithm

Lower Level Number Wins.

When directives conflict, the directive from the lower numeric level takes precedence.

## Intra-level Priorities

Within Level 3:
- RHP > SCP
- EIP > SCP

## Tie Handling

If directives share a level and no explicit priority relation exists, the conflict stays open for protocol update.

## Scope

These rules apply to protocol documentation and protocol interpretation only.
