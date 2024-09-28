{
    "dns": {
        "servers": [
			"1.1.1.1",
            "8.8.8.8"
        ],
        "tag": "built-in-DNS"
    },
    "inbounds": [
        {
            "listen": "0.0.0.0",
            "port": 10808,
            "protocol": "socks",
            "settings": {
                "udp": true,
				"auth": "noauth",
				"allowTransparent": false
            },
            "sniffing": {
                "destOverride": [
                    "http",
                    "tls"
                ],
                "enabled": true,
				"routeOnly": false
            },
            "tag": "socks_IN"
        },
        {
            "listen": "0.0.0.0",
            "port": 10809,
            "protocol": "http",
            "settings": {
                "allowTransparent": false,
				"auth": "noauth",
				"udp": true
            },
            "sniffing": {
                "destOverride": [
                    "http",
                    "tls"
                ],
                "enabled": true,
				"routeOnly": false
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
                        "address": "license-market.ir",
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
                    "fingerprint": "chrome",
                    "minVersion": "1.3",
                    "serverName": "aiisontheway.shop"
                },
                "wsSettings": {
                    "headers": {
                        "Host": "aiisontheway.shop",
						"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
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
                    "interval": "1-4",
                    "length": "1-1",
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
        "domainStrategy": "AsIs",
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
            },
			{
				"type": "field",
				"outboundTag": "direct",
				"domain": [
				  "domain:.ir"
				]
			}
        ]
    }
}
