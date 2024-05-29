{
    "dns": {
        "queryStrategy": "UseIP",
        "servers": [
            "8.8.8.8"
        ],
        "tag": "built-in-DNS"
    },
    "inbounds": [
        {
            "listen": "127.0.0.1",
            "port": 10808,
            "protocol": "socks",
            "settings": {
                "udp": true
            },
            "sniffing": {
                "destOverride": [
                    "http",
                    "tls",
                    "quic"
                ],
                "enabled": true
            },
            "tag": "socks_IN"
        },
        {
            "listen": "127.0.0.1",
            "port": 10809,
            "protocol": "http",
            "settings": {
                "allowTransparent": true,
                "timeout": 300
            },
            "sniffing": {
                "destOverride": [
                    "http",
                    "tls"
                ],
                "enabled": true
            },
            "tag": "http_IN"
        }
    ],
    "log": {
        "loglevel": "Warn"
    },
    "outbounds": [
        {
            "mux": {
                "concurrency": 8,
                "enabled": false,
                "xudpConcurrency": 8,
                "xudpProxyUDP443": "reject"
            },
            "protocol": "vless",
            "settings": {
                "vnext": [
                    {
                        "address": "gama.ir",
                        "port": 443,
                        "users": [
                            {
                                "encryption": "none",
                                "id": "6c5d5e78-894c-4c11-a3f0-5c148603cdca"
                            }
                        ]
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "security": "tls",
                "sockopt": {
                    "dialerProxy": "frag-out",
                    "tcpFastOpen": true,
                    "tcpKeepAliveIdle": 120,
                    "tcpNoDelay": true
                },
                "tlsSettings": {
                    "allowInsecure": false,
                    "fingerprint": "randomized",
                    "minVersion": "1.3",
                    "serverName": "aiisontheway.shop"
                },
                "wsSettings": {
                    "headers": {
                        "Host": "aiisontheway.shop"
                    },
                    "path": "/holypath"
                }
            },
            "tag": "proxy"
        },
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP",
                "fragment": {
                    "interval": "1-5",
                    "length": "10-15",
                    "packets": "1-1"
                }
            },
            "streamSettings": {
                "sockopt": {
                    "domainStrategy": "UseIP",
                    "tcpKeepAliveIdle": 120,
                    "TcpNoDelay": true
                }
            },
            "tag": "frag-out"
        },
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP"
            },
            "streamSettings": {
            },
            "tag": "direct"
        },
        {
            "protocol": "blackhole",
            "settings": {
                "response": {
                    "type": "none"
                }
            },
            "tag": "block"
        },
        {
            "protocol": "dns",
            "proxySettings": {
                "tag": "proxy"
            },
            "settings": {
                "nonIPQuery": "drop"
            },
            "tag": "dns-out"
        }
    ],
    "routing": {
        "domainMatcher": "hybrid",
        "domainStrategy": "IPIfNonMatch",
        "rules": [
            {
                "inboundTag": [
                    "socks_IN"
                ],
                "outboundTag": "dns-out",
                "port": "53",
                "type": "field"
            },
            {
                "inboundTag": [
                    "built-in-DNS"
                ],
                "outboundTag": "proxy",
                "type": "field"
            }
        ]
    }
}
