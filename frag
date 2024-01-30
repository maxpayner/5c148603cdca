{
    "log": {
       "loglevel": "Warn"
    },
    "dns": {
       "servers": [
          "8.8.8.8"
       ],
       "queryStrategy": "UseIP",
       "tag": "built-in-DNS"
    },
    "inbounds": [
       {
          "listen": "127.0.0.1",
          "port": 10808,
          "protocol": "socks",
          "tag": "socks_IN",
          "settings": {
             "udp": true
          },
          "sniffing": {
             "enabled": true,
             "destOverride": [
                "http",
                "tls",
                "quic"
             ]
          }
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
             "enabled": true,
             "destOverride": [
                "http",
                "tls"
             ]
          },
          "tag": "http_IN"
       }
    ],
    "outbounds": [
       {
          "tag": "proxy",
          "protocol": "vless",
          "settings": {
             "vnext": [
                {
                   "address": "gama.ir",
                   "port": 8443,
                   "users": [
                      {
                         "id": "9127c77e-6f03-4e98-d9ad-13f76dd10a47",
                         "encryption": "none"
                      }
                   ]
                }
             ]
          },
          "streamSettings": {
             "network": "ws",
             "security": "tls",
             "tlsSettings": {
                "allowInsecure": false,
                "minVersion": "1.3",
                "fingerprint": "randomized", 
                "serverName": "aiisontheway.shop"
             },
             "wsSettings": {
                "headers": {
                   "Host": "aiisontheway.shop"
                },
                "path": "/holypathfrag"
             },
             "sockopt": {
                "tcpFastOpen": false,
                "dialerProxy": "frag-out",
                "tcpKeepAliveIdle": 120,
                "tcpNoDelay": true
             }
          },
          "mux": {
             "enabled": true,
             "concurrency": 8,
             "xudpConcurrency": 8,
             "xudpProxyUDP443": "reject"
          }
       },
       {
          "tag": "frag-out",
          "protocol": "freedom",
          "settings": {
             "domainStrategy": "UseIP",
             "fragment": {
                "packets": "tlshello",
                "length": "10-20",
                "interval": "10-15"
             }
          },
          "streamSettings": {
             "sockopt": {
                "TcpNoDelay": true,
                "tcpKeepAliveIdle": 120,
                "domainStrategy": "UseIP"
             }
          }
       },
       {
          "protocol": "freedom",
          "settings": {
             "domainStrategy": "UseIP"
          },
          "streamSettings": {},
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
          "settings": {
             "nonIPQuery": "drop"
          },
          "proxySettings": {
             "tag": "proxy"
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
             "inboundTag": ["built-in-DNS"],
             "outboundTag": "proxy",
             "type": "field"
          }
       ]
    }
 }
