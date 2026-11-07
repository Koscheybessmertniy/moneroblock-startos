# MoneroBlock

## First launch

1. Keep your Monero service running and synchronized.
2. Open **Web UI** for MoneroBlock.
3. Browse recent blocks, or search for a block height, block hash or transaction hash.

The explorer uses your installed Monero node. It does not need a second blockchain
copy, wallet private keys or a wallet RPC connection.

## RPC credentials

MoneroBlock reads the RPC username and password from your Monero service when it
starts. After changing those credentials in Monero, restart MoneroBlock.

## Troubleshooting

If the explorer is running but pages fail to load, check the Monero service and
the MoneroBlock service log. A green web-server health check does not confirm
that every RPC request succeeds. Historical transaction details may be missing
when your Monero node is pruned.

MoneroBlock's backup does not include the Monero blockchain or wallet data;
back up the Monero service separately.

## Documentation

- [MoneroBlock usage and source documentation](https://github.com/duggavo/MoneroBlock#readme)
