## commander claus

Secret Santa from the command line.

```
npm install commander-claus
```

### Usage

By default, commander-claus uses Gmail to send messages, with username
`$CLAUSUSER` and password `$CLAUSPASSWORD`.

Modify Claus#transport to send messages another way.

### Options

#### `-f, --file`

Default: `claus.csv`.

The to read names from.  First row must be the header: `name,email` using any
delimiter.  A custom delimiter can be set with the `-d, --delim` flag.

#### `-d, --delim`

Default: `,`.

The delimiter passed to [dsv](https://github.com/mbostock/dsv).  Used to parse
the input file.

#### `-s, --subject`

Default: `Secret Santa`

The email subject sent to all recipients.

#### `--dryrun`

Do everything except send emails.

#### `--reveal`

Reveal matches.