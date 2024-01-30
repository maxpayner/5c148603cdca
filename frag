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
                "enabled": true,
                "xudpConcurrency": 8,
                "xudpProxyUDP443": "reject"
            },
            "protocol": "vless",
            "settings": {
                "vnext": [
                    {
                        "address": "gama.ir",
                        "port": 8443,
                        "users": [
                            {
                                "encryption": "none",
                                "id": "9127c77e-6f03-4e98-d9ad-13f76dd10a47"
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
                    "tcpFastOpen": false,
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
                    "path": "/holypathfrag"
                }
            },
            "tag": "proxy"
        },
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP",
                "fragment": {
                    "interval": "10-15",
                    "length": "10-20",
                    "packets": "tlshello"
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
                "enabled": true,
                "xudpConcurrency": 8,
                "xudpProxyUDP443": "reject"
            },
            "protocol": "vless",
            "settings": {
                "vnext": [
                    {
                        "address": "www.zula.ir",
                        "port": 8443,
                        "users": [
                            {
                                "encryption": "none",
                                "id": "9127c77e-6f03-4e98-d9ad-13f76dd10a47"
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
                    "tcpFastOpen": false,
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
                    "path": "/holypathfrag"
                }
            },
            "tag": "proxy"
        },
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP",
                "fragment": {
                    "interval": "10-15",
                    "length": "10-20",
                    "packets": "tlshello"
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
