{
  "dns" : {
    "servers" : [
      "8.8.8.8"
    ],
    "tag" : "built-in-DNS"
  },
  "fakedns" : [
    {
      "ipPool" : "198.20.0.0\/15",
      "poolSize" : 512
    },
    {
      "ipPool" : "fc00::\/64",
      "poolSize" : 512
    }
  ],
  "inbounds" : [
    {
      "listen" : "127.0.0.1",
      "port" : 1080,
      "protocol" : "socks",
      "settings" : {
        "auth" : "noauth",
        "udp" : true
      },
      "sniffing" : {
        "destOverride" : [
          "http",
          "tls",
          "quic",
          "fakedns"
        ],
        "enabled" : true,
        "routeOnly" : true
      },
      "tag" : "socks"
    }
  ],
  "log" : {
    "loglevel" : "Warn"
  },
  "outbounds" : [
    {
      "protocol" : "vless",
      "settings" : {
        "vnext" : [
          {
            "address" : "www.zula.ir",
            "port" : 8443,
            "users" : [
              {
                "encryption" : "none",
                "id" : "9127c77e-6f03-4e98-d9ad-13f76dd10a47"
              }
            ]
          }
        ]
      },
      "streamSettings" : {
        "network" : "ws",
        "security" : "tls",
        "sockopt" : {
          "dialerProxy" : "frag-out",
          "tcpNoDelay" : true
        },
        "tlsSettings" : {
          "allowInsecure" : false,
          "fingerprint" : "randomized",
          "minVersion" : "1.3",
          "serverName" : "aiisontheway.shop"
        },
        "wsSettings" : {
          "headers" : {
            "Host" : "aiisontheway.shop"
          },
          "path" : "\/holypathfrag"
        }
      },
      "tag" : "proxy"
    },
    {
      "protocol" : "freedom",
      "settings" : {
        "fragment" : {
          "interval" : "10-15",
          "length" : "10-20",
          "packets" : "tlshello"
        }
      },
      "streamSettings" : {
        "sockopt" : {
          "domainStrategy" : "UseIP"
        }
      },
      "tag" : "frag-out"
    },
    {
      "protocol" : "freedom",
      "settings" : {

      },
      "streamSettings" : {

      },
      "tag" : "direct"
    },
    {
      "protocol" : "blackhole",
      "settings" : {

      },
      "tag" : "block"
    },
    {
      "protocol" : "dns",
      "settings" : {

      },
      "tag" : "dns-out"
    }
  ],
  "routing" : {
    "domainMatcher" : "hybrid",
    "domainStrategy" : "IPIfNonMatch",
    "rules" : [
      {
        "inboundTag" : [
          "socks_IN"
        ],
        "outboundTag" : "dns-out",
        "port" : "53",
        "type" : "field"
      },
      {
        "inboundTag" : [
          "built-in-DNS"
        ],
        "outboundTag" : "proxy",
        "type" : "field"
      }
    ]
  }
}
