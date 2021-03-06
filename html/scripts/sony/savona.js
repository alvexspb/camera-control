var Savona = (function () {

	return {
		create: function (host, port) {

			var holder = {};

            createSavona(holder);
            createLinear(holder);
            createMsgpack(holder);

            var client = new holder.savona.client({transports: {
                host: host, port: port
            }});

            client.reconnect = function () {
                if (client.state() === 'disconnected') {
                    client.connect();
                }
            };

            return client;
        }
	};

	function createSavona(holder) {
        holder.savona = function() {};
        holder.savona.client = function(a) {
            var c = this;
            c.version = "2.0.6";
            c.linear = new holder.linear.client(a);
            c.linear.onconnect = function(a) {
                c.hasOwnProperty("onconnect") && "function" === typeof c.onconnect && c.onconnect.call(c, a)
            };
            c.linear.ondisconnect = function(a) {
                c.hasOwnProperty("ondisconnect") && "function" === typeof c.ondisconnect && c.ondisconnect.call(c, a)
            };
            c.linear.onnotify = function(a) {
                c.hasOwnProperty("onnotify") && "function" === typeof c.onnotify && c.onnotify.call(c, a)
            };
            c.linear.onresponse = function(a) {
                    c.hasOwnProperty("onresponse") && "function" === typeof c.onresponse && c.onresponse.call(c, a)
                };
            c.property = new holder.savona.property(c);
            c.capability = new holder.savona.capability(c);
            c.process = new holder.savona.process(c);
            c.system = new holder.savona.system(c);
            c.clip = new holder.savona.clip(c);
            c.storage = new holder.savona.storage(c);
            c.button = new holder.savona.button(c);
            c.notify = new holder.savona.notify(c);
            c.p = new holder.savona.p(c);
            c.alternate = new holder.savona.alternate(c);
            c.network = new holder.savona.network(c)
        };
        holder.savona.client.prototype.state = function() {
            return this.linear.state()
        };
        holder.savona.client.prototype.connect = function(a) {
            return this.linear.connect(a)
        };
        holder.savona.client.prototype.disconnect = function() {
            return this.linear.disconnect()
        };
        holder.savona.client.prototype.request = function(a, c) {
            var b = this,
                h = {
                    method: a,
                    params: []
                },
                d = "Capability.GetValue Process.Abort Process.Execute.AutomaticAdjustment Process.Execute.Reacquisition Button.SendKeys Notify.Subscribe Notify.Unsubscribe System.GetProperties System.GetCapabilities System.Process.AutoAdjust System.Process.Abort".split(" "),
                j = ["Clip.UploadFiles"];
            if (!c) return -1;
            c.params && d.join().match(a) ? h.params.push(c.params) : c.params && (h.params = h.params.concat(c.params));
            if (c.params)
                for (d = 0; d < j.length; d++) j[d] === a && (h.params = [h.params]);
            console && debugMode && "undefined" !== typeof JSON && console.log("method: " + a + ", params: " + JSON.stringify(h.params));
            h.onresponse = function(a) {
                c.onresponse && typeof c.onresponse === "function" && c.onresponse.call(b, a)
            };
            h.timeout = c.timeout || 3E4;
            return b.linear.request(h)
        };
        holder.savona.property = function(a) {
            this.client = a
        };
        holder.savona.property.prototype.GetStatus = function(a) {
                return this.client.request("Property.GetStatus", a)
            };
        holder.savona.property.prototype.GetValue = function(a) {
            return this.client.request("Property.GetValue", a)
        };
        holder.savona.property.prototype.GetBackupValue = function(a) {
            return this.client.request("Property.GetBackupValue", a)
        };
        holder.savona.property.prototype.SetValue = function(a) {
            return this.client.request("Property.SetValue", a)
        };
        holder.savona.property.prototype.AddValue = function(a) {
            return this.client.request("Property.AddValue", a)
        };
        holder.savona.property.prototype.DeleteValue = function(a) {
                return this.client.request("Property.DeleteValue", a)
            };
        holder.savona.property.prototype.UpdateValue = function(a) {
            return this.client.request("Property.UpdateValue", a)
        };
        holder.savona.property.prototype.GetRequestInterval = function(a) {
            return this.client.request("Property.GetRequestInterval", a)
        };
        holder.savona.capability = function(a) {
            this.client = a
        };
        holder.savona.capability.prototype.GetValue = function(a) {
            return this.client.request("Capability.GetValue", a)
        };
        holder.savona.process = function(a) {
            this.client = a;
            this.execute = new holder.savona.process.execute(a)
        };
        holder.savona.process.prototype.GetList = function(a) {
            return this.client.request("Process.GetList", a)
        };
        holder.savona.process.prototype.Abort = function(a) {
            return this.client.request("Process.Abort", a)
        };
        holder.savona.process.execute = function(a) {
            this.client = a
        };
        holder.savona.process.execute.prototype.AutomaticAdjustment = function(a) {
            return this.client.request("Process.Execute.AutomaticAdjustment", a)
        };
        holder.savona.process.execute.prototype.Reacquisition = function(a) {
            return this.client.request("Process.Execute.Reacquisition", a)
        };
        holder.savona.system = function(a) {
			this.client = a;
			this.firmware = new holder.savona.system.firmware(a);
			this.settings = new holder.savona.system.settings(a);
			this.logs = new holder.savona.system.logs(a);
			this.process = new holder.savona.system.process(a)
		};
        holder.savona.system.prototype.Reboot = function(a) {
            return this.client.request("System.Reboot", a)
        };
        holder.savona.system.prototype.Shutdown = function(a) {
            return this.client.request("System.Shutdown", a)
        };
        holder.savona.system.prototype.FactoryReset = function(a) {
            return this.client.request("System.FactoryReset", a)
        };
        holder.savona.system.firmware = function(a) {
			this.client = a
		};
        holder.savona.system.firmware.prototype.Update = function(a) {
            return this.client.request("System.Firmware.Update", a)
        };
        holder.savona.system.settings = function(a) {
            this.client = a
        };
        holder.savona.system.settings.prototype.Reset = function(a) {
            return this.client.request("System.Settings.Reset", a)
        };
        holder.savona.system.settings.prototype.Save = function(a) {
            return this.client.request("System.Settings.Save", a)
        };
        holder.savona.system.settings.prototype.Load = function(a) {
            return this.client.request("System.Settings.Load", a)
        };
        holder.savona.system.logs = function(a) {
            this.client = a
        };
        holder.savona.system.logs.prototype.Save = function(a) {
            return this.client.request("System.Logs.Save", a)
        };
        holder.savona.system.prototype.GetProperties = function(a) {
            return this.client.request("System.GetProperties", a)
        };
        holder.savona.system.prototype.SetProperties = function(a) {
            return this.client.request("System.SetProperties", a)
        };
        holder.savona.system.prototype.IncrementProperties = function(a) {
            return this.client.request("System.IncrementProperties", a)
        };
        holder.savona.system.prototype.DecrementProperties = function(a) {
			return this.client.request("System.DecrementProperties", a)
		};
        holder.savona.system.prototype.GetCapabilities = function(a) {
            return this.client.request("System.GetCapabilities", a)
        };
        holder.savona.system.process = function(a) {
            this.client = a
        };
        holder.savona.system.process.prototype.GetList = function(a) {
            return this.client.request("System.Process.GetList", a)
        };
        holder.savona.system.process.prototype.AutoAdjust = function(a) {
            return this.client.request("System.Process.AutoAdjust", a)
        };
        holder.savona.system.process.prototype.Abort = function(a) {
            return this.client.request("System.Process.Abort", a)
        };
        holder.savona.clip = function(a) {
            this.client = a;
            this.player = new holder.savona.clip.player(a);
            this.recorder = new holder.savona.clip.recorder(a)
        };
        holder.savona.clip.prototype.GetList = function(a) {
            return this.client.request("Clip.GetList", a)
        };
        holder.savona.clip.prototype.GetThumbnailUrls = function(a) {
            return this.client.request("Clip.GetThumbnailUrls", a)
        };
        holder.savona.clip.prototype.Copy = function(a) {
            return this.client.request("Clip.Copy", a)
        };
        holder.savona.clip.prototype.Rename = function(a) {
            return this.client.request("Clip.Rename", a)
        };
        holder.savona.clip.prototype.Move = function(a) {
			return this.client.request("Clip.Move", a)
		};
        holder.savona.clip.prototype.Delete = function(a) {
            return this.client.request("Clip.Delete", a)
        };
        holder.savona.clip.prototype.Upload = function(a) {
            return this.client.request("Clip.Upload", a)
        };
        holder.savona.clip.prototype.UploadFiles = function(a) {
            return this.client.request("Clip.UploadFiles", a)
        };
        holder.savona.clip.prototype.Download = function(a) {
            return this.client.request("Clip.Download", a)
        };
        holder.savona.clip.prototype.GetMediaProfileUrls = function(a) {
            return this.client.request("Clip.GetMediaProfileUrls", a)
        };
        holder.savona.clip.player = function(a) {
            this.client = a
        };
        holder.savona.clip.player.prototype.Open = function(a) {
            return this.client.request("Clip.Player.Open", a)
        };
        holder.savona.clip.player.prototype.GotoClip = function(a) {
            return this.client.request("Clip.Player.GotoClip", a)
        };
        holder.savona.clip.player.prototype.Close = function(a) {
            return this.client.request("Clip.Player.Close", a)
        };
        holder.savona.clip.player.prototype.Start = function(a) {
            return this.client.request("Clip.Player.Start", a)
        };
        holder.savona.clip.player.prototype.Stop = function(a) {
            return this.client.request("Clip.Player.Stop", a)
        };
        holder.savona.clip.player.prototype.Pause = function(a) {
            return this.client.request("Clip.Player.Pause", a)
        };
        holder.savona.clip.player.prototype.FastForward = function(a) {
            return this.client.request("Clip.Player.FastForward", a)
        };
        holder.savona.clip.player.prototype.Rewind = function(a) {
            return this.client.request("Clip.Player.Rewind", a)
        };
        holder.savona.clip.player.prototype.Shuttle = function(a) {
            return this.client.request("Clip.Player.Shuttle", a)
        };
        holder.savona.clip.player.prototype.Step = function(a) {
            return this.client.request("Clip.Player.Step", a)
        };
        holder.savona.clip.recorder = function(a) {
            this.client = a
        };
        holder.savona.clip.recorder.prototype.Open = function(a) {
            return this.client.request("Clip.Recorder.Open", a)
        };
        holder.savona.clip.recorder.prototype.Close = function(a) {
            return this.client.request("Clip.Recorder.Close", a)
        };
        holder.savona.clip.recorder.prototype.Start = function(a) {
            return this.client.request("Clip.Recorder.Start", a)
        };
        holder.savona.clip.recorder.prototype.Stop = function(a) {
            return this.client.request("Clip.Recorder.Stop", a)
        };
        holder.savona.network = function(a) {
            this.wireless =
                new holder.savona.network.wireless(a)
        };
        holder.savona.network.wireless = function(a) {
            this.wps = new holder.savona.network.wireless.wps(a)
        };
        holder.savona.network.wireless.wps = function(a) {
            this.client = a
        };
        holder.savona.network.wireless.wps.prototype.Start = function(a) {
            return this.client.request("Network.Wireless.WPS.Start", a)
        };
        holder.savona.storage = function(a) {
            this.drive = new holder.savona.storage.drive(a)
        };
        holder.savona.storage.drive = function(a) {
            this.client = a
        };
        holder.savona.storage.drive.prototype.Format = function(a) {
            return this.client.request("Storage.Drive.Format",
                a)
        };
        holder.savona.storage.drive.prototype.Eject = function(a) {
            return this.client.request("Storage.Drive.Eject", a)
        };
        holder.savona.storage.drive.prototype.Finalize = function(a) {
            return this.client.request("Storage.Drive.Finalize", a)
        };
        holder.savona.button = function(a) {
            this.client = a
        };
        holder.savona.button.prototype.SendKeys = function(a) {
            return this.client.request("Button.SendKeys", a)
        };
        holder.savona.notify = function(a) {
            this.client = a
        };
        holder.savona.notify.prototype.Subscribe = function(a) {
            return this.client.request("Notify.Subscribe", a)
        };
        holder.savona.notify.prototype.Unsubscribe = function(a) {
			return this.client.request("Notify.Unsubscribe", a)
		};
        holder.savona.p = function(a) {
            this.process = new holder.savona.p.process(a)
        };
        holder.savona.p.process = function(a) {
            this.client = a
        };
        holder.savona.p.process.prototype.Execute = function(a) {
            return this.client.request("P.Process.Execute", a)
        };
        holder.savona.alternate = function(a) {
            this.authentication = new holder.savona.alternate.authentication(a)
        };
        holder.savona.alternate.authentication = function(a) {
            this.client = a
        };
        holder.savona.alternate.authentication.prototype.Basic = function(a) {
            return this.client.request("Alternate.Authentication.Basic", a)
        }
    }

    function createLinear(holder) {
        holder.linear = function() {};
        holder.linear.todouble = function(a) {
            return new holder.msgpack.todouble(a)
        };
        holder.linear.base64 = function() {
            var a = function(a) {
                for (var b = {}, h = 0, d = a.length; h < d; ++h) b[a.charAt(h)] = h;
                return b
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
            return {
                encode: function(a) {
                    var b = 0;
                    if ("string" !== typeof a) throw "INVALID_CHARACTER_ERR";
                    for (; a.length % 3;) a += "\x00", b++;
                    a = a.replace(/[\x00-\xFF]{3}/g, function(a) {
                        a = a.charCodeAt(0) << 16 | a.charCodeAt(1) << 8 | a.charCodeAt(2);
                        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 18) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a & 63)
                    });
                    if (!b) return a;
                    for (a = a.substr(0, a.length - b); b--;) a += "=";
                    return a
                },
                decode: function(b) {
                    var f = 0;
                    if ("string" !== typeof b || b.length % 4 || null !== b.match(/[^A-Za-z0-9\+\/=]/) ||
                        -1 !== b.indexOf("=") && b.indexOf("=") < b.length - 2) throw "INVALID_CHARACTER_ERR";
                    for (b = b.replace(/[^A-Za-z0-9\+\/]/g, ""); b.length % 4;) b += "A", f++;
                    if (2 < f) throw "INVALID_CHARACTER_ERR";
                    b = b.replace(/[A-Za-z0-9\+\/]{4}/g, function(b) {
                        b = a[b.charAt(0)] << 18 | a[b.charAt(1)] << 12 | a[b.charAt(2)] << 6 | a[b.charAt(3)];
                        return String.fromCharCode(b >> 16) + String.fromCharCode(b >> 8 & 255) + String.fromCharCode(b & 255)
                    });
                    1 <= f && (b = b.substring(0, b.length - [0, 1, 2][f]));
                    return b
                }
            }
        }();
        holder.linear.btoa = function(a) {
            var c = holder.btoa || holder.linear.base64.encode;
            if ("string" !== typeof a) throw "INVALID_CHARACTER_ERR";
            return c(a)
        };
        holder.linear.atob = function(a) {
            var c = holder.atob || holder.linear.base64.decode;
            if ("string" !== typeof a) throw "INVALID_CHARACTER_ERR";
            return c(a)
        };
        holder.linear.extend = function(a, b) {
            var f = new a;
            if (!b) return f;
            for (var h in b) f[h] !== b[h] && (f[h] = b[h]);
            return f
        };
        holder.linear.codec = function() {
            this.type = void 0
        };
        holder.linear.codec.prototype.encode = function(a) {
            return a
        };
        holder.linear.codec.prototype.decode = function(a) {
            return a
        };
        holder.linear.codec.prototype.refresh = function() {};
        holder.linear.codec.plain = function() {
                this.type = "plain";
                return holder.linear.extend(holder.linear.codec, this)
            };
        holder.linear.codec.msgpack = function() {
            this.type = "msgpack";
            this.unpacker = new holder.msgpack.unpacker;
            return holder.linear.extend(holder.linear.codec, this)
        };
        holder.linear.codec.msgpack.prototype.encode = function(a) {
            return holder.msgpack.pack(a)
        };
        holder.linear.codec.msgpack.prototype.decode = function(a) {
            var b = [];
            for (this.unpacker.feed(a); void 0 !== (a = this.unpacker.unpack());) b.push(a);
            return b
        };
        holder.linear.codec.msgpack.prototype.refresh = function() {
            this.unpacker.refresh()
        };
        holder.linear.protocol = function() {
            this.codec = this.type = void 0
        };
        holder.linear.protocol.prototype.request = function() {
            throw Error("method is not allowed");
        };
        holder.linear.protocol.prototype.response = function() {
            throw Error("method is not allowed");
        };
        holder.linear.protocol.prototype.notify = function() {
            throw Error("method is not allowed");
        };
        holder.linear.protocol.prototype.onmessage = function(a) {
            return a
        };
        holder.linear.protocol.prototype.reset = function() {};
        holder.linear.protocol.plain = function() {
            this.type = "plain";
            this.codec = new linear.codec.plain;
            return holder.linear.extend(holder.linear.protocol, this)
        };
        holder.linear.protocol.plain.prototype.onmessage = function(a) {
            var b = [];
            a && b.push({
                type: "notify",
                data: {
                    name: void 0,
                    data: a
                }
            });
            return b
        };
        holder.linear.protocol.linear = function() {
            this.type = "linear";
            this.msgid = 0;
            this.codec = new holder.linear.codec.msgpack;
            this.requests = {};
            return holder.linear.extend(holder.linear.protocol, this)
        };
        holder.linear.protocol.linear.prototype.request = function(a) {
            var b = this,
                f = {},
                h;
            if (a && !("[object Object]" !== Object.prototype.toString.call(a) || !("method" in a) || !("params" in
                a) || !(a.params instanceof Array))) {
                do b.msgid = 4294967295 <= b.msgid ? 0 : b.msgid + 1; while (b.requests[b.msgid]);
                h = b.codec.encode([0, b.msgid, a.method, a.params]);
                f.id = b.msgid;
                f.onresponse = a.onresponse;
                f.timeout = setTimeout(function() {
                    b.ontimeout(f.id)
                }, 0 < a.timeout ? a.timeout : 3E4);
                b.requests[f.id] = f;
                return {
                    id: f.id,
                    data: h,
                    timeout: 0 < a.timeout ? a.timeout : 3E4
                }
            }
        };
        holder.linear.protocol.linear.prototype.notify = function(a) {
            return !a || "[object Object]" !== Object.prototype.toString.call(a) || !("name" in a) || !("data" in a) || !(a.data instanceof Array) ? void 0 : this.codec.encode([2, a.name, a.data])
        };
        holder.linear.protocol.linear.prototype.ontimeout = function(a) {
            this.requests[a] && ("function" === typeof this.requests[a].onresponse && this.requests[a].onresponse.call(this, {
                id: a,
                error: "timeout",
                result: null
            }), delete this.requests[a])
        };
        holder.linear.protocol.linear.prototype.onmessage = function(a) {
            var c = Object.prototype.toString.call(a),
                f, h, d = [],
                j;
            if ("[object String]" === c) try {
                h = holder.linear.atob(a)
            } catch (k) {
                return console && console.log("invalid data"), d
            } else if ("[object ArrayBuffer]" ===
                c) {
                f = new Uint8Array(a);
                h = [];
                a = 0;
                for (c = f.length; a < c; ++a) h[a] = f[a]
            } else if ("[object Array]" === c || "[object Number]" === c) h = a;
            else return console && console.log("invalid data"), d;
            h = this.codec.decode(h);
            a = 0;
            for (c = h.length; a < c; ++a) switch (h[a][0]) {
                case 0:
                    console && console.log("request is unacceptable");
                    break;
                case 1:
                    f = h[a][1];
                    this.requests[f] && (clearTimeout(this.requests.timer), "function" === typeof this.requests[f].onresponse ? this.requests[f].onresponse.call(this, {
                            id: f,
                            error: h[a][2],
                            result: h[a][3]
                        }) : d.push({
                            type: "response",
                            data: {
                                id: f,
                                error: h[a][2],
                                result: h[a][3]
                            }
                        }), delete this.requests[f]);
                    break;
                case 2:
                    f = h[a][1];
                    j = h[a][2];
                    d.push({
                        type: "notify",
                        data: {
                            name: f,
                            data: j
                        }
                    });
                    break;
                default:
                    console && console.log("invalid data")
            }
            return d
        };
        holder.linear.protocol.linear.prototype.reset = function() {
            this.codec.refresh()
        };
        holder.linear.transport = function() {
            this.state = "disconnected";
            this.sendbuffer = [];
            this.num2bin = {};
            for (var a = 0; 256 > a; ++a) this.num2bin[a] = String.fromCharCode(a)
        };
        holder.linear.transport.create = function(a) {
            var b, f, h, d, j, k, m, l = {},
                e;
            for (e in a)
                "type" === e.toLowerCase() && (b = a[e]),
                "channel" === e.toLowerCase() && (d = a[e]),
                "host" === e.toLowerCase() && (f = a[e]),
                "port" === e.toLowerCase() && (h = a[e]),
                "path" === e.toLowerCase() && (j = a[e]),
                "usessl" === e.toLowerCase() && (m = !!a[e]),
                "options" === e.toLowerCase() && (k = a[e]);
            "undefined" === typeof m && (m = !!location.protocol.match(/https/));
            b = b || "websocket";
            f = f || "localhost";
            h = parseInt(h || location.port, 10) || (m ? 443 : 80);
            d = d || "linear";
            d = d.match(/^\//) ? d : "/" + d;
            if ("websocket" === b) a = m ? "wss://" + f + (443 === h ? "" : ":" + h) + d : "ws://" + f + (80 ===
                h ? "" : ":" + h) + d;
            else if ("polling" === b) j = j || "cgi/linear.fcgi", j = j.match(/^\//) ? j : "/" + j, a = m ? "https://" + f + (443 === h ? "" : ":" + h) + j : "http://" + f + (80 === h ? "" : ":" + h) + j;
            else {
                console && console.log("transport: " + l.type + " is not implemented.");
                return
            }
            l.type = b;
            l.entry = {};
            l.entry.url = a;
            l.entry.channel = d;
            l.entry.options = k;
            return l
        };
        holder.linear.transport.prototype.connect = function(a) {
            function c() {
                d.type = "websocket";
                d.raw = new holder.linear.transport.websocket(h);
                d.raw.onopen = function(a) {
                    d._onopen(a)
                };
                d.raw.onclose = d.raw.onerror =
                    function(a) {
                        d._onclose(a)
                    };
                d.raw.onmessage = function(a) {
                    d._onmessage(a)
                };
                d._onopen()
            }

            function f() {
                h = void 0;
                d.entry.polling ? (d.type = "polling", d.raw = new holder.linear.transport.polling(d.entry.polling.url, d.entry.polling.channel, d.entry.polling.options, function() {
                        d._onopen()
                    }, function() {
                        d._onclose()
                    }), d.raw.onopen = function(a) {
                        d._onopen(a)
                    }, d.raw.onclose = d.raw.onerror = function(a) {
                        d._onclose(a)
                    }, d.raw.onmessage = function(a) {
                        d._onmessage(a)
                    }) : d._onclose()
            }
            var h, d = this;
            if (!("connecting" === d.state || "connected" ===
                d.state))
                if (d.state = "connecting", a = a && a.timeout ? a.timeout : 3E4, d.entry.websocket) {
                    try {
                        h = new WebSocket(d.entry.websocket.url)
                    } catch (j) {
                        if (!d.entry.polling) {
                            d._onclose();
                            return
                        }
                        d.type = "polling";
                        d.raw = new holder.linear.transport.polling(
                            d.entry.polling.url,
                            d.entry.polling.channel,
                            d.entry.polling.options,
                            function() {
                                d._onopen()
                            },
                            function() {
                                d._onclose()
                            }
                        );
                        d.raw.onopen = function(a) {
                            d._onopen(a)
                        };
                        d.raw.onclose = d.raw.onerror = function(a) {
                            d._onclose(a)
                        };
                        d.raw.onmessage = function(a) {
                            d._onmessage(a)
                        };
                        return
                    }
                    h.onopen = c;
                    h.onclose = f;
                    setTimeout(function() {
                        "connecting" === d.state && f()
                    }, a)
                } else d.entry.polling ? (d.type = "polling", d.raw = new holder.linear.transport.polling(d.entry.polling.url, d.entry.polling.channel, d.entry.polling.options, function() {
                        d._onopen()
                    }, function() {
                        d._onclose()
                    }), d.raw.onopen = function(a) {
                        d._onopen(a)
                    }, d.raw.onclose = d.raw.onerror = function(a) {
                        d._onclose(a)
                    }, d.raw.onmessage = function(a) {
                        d._onmessage(a)
                    }, setTimeout(function() {
                        "connecting" === d.state && d._onclose()
                    }, a)) : d._onclose()
        };
        holder.linear.transport.prototype._onopen = function(a) {
                if ("connecting" === this.state) {
                    this.state = "connected";
                    for (var b = 0, f = this.sendbuffer.length; b < f; ++b) this.send(this.sendbuffer[b]);
                    this.sendbuffer = [];
                    if ("function" === typeof this.onopen) this.onopen(a)
                }
            };
        holder.linear.transport.prototype._onclose = function(a) {
            if ("disconnected" !== this.state && (this.state = "disconnected", "function" === typeof this.onclose)) this.onclose(a)
        };
        holder.linear.transport.prototype._onmessage = function(a) {
            if ("connected" === this.state && "function" === typeof this.onmessage) this.onmessage(a)
        };
        holder.linear.transport.prototype.disconnect = function() {
            "disconnected" !== this.state && this.raw && (this.state = "disconnecting", this.sendbuffer = [], "function" === typeof this.raw.disconnect && this.raw.disconnect())
        };
        holder.linear.transport.prototype.send = function(a) {
            var c, f = Object.prototype.toString.call(a);
            if (!("disconnecting" === this.state || "disconnected" === this.state))
                if ("connecting" === this.state) this.sendbuffer[this.sendbuffer.length] = a;
                else {
                    if ("[object String]" === f) c = a;
                    else if ("[object Array]" === f || "[object ArrayBuffer]" ===
                        f)
                        if ("text" === this.raw.type) {
                            c = [];
                            for (var f = 0, h = a.length; f < h; ++f) c[f] = this.num2bin[a[f]];
                            c = holder.linear.btoa(c.join(""))
                        } else "binary" === this.raw.type && (c = (new Uint8Array(a)).buffer);
                    else return;
                    this.raw.send(c)
                }
        };
        holder.linear.transport.websocket = function(a) {
            var b = this;
            b.socket = a;
            "binaryType" in b.socket ? (b.socket.binaryType = "arraybuffer", b.type = "binary") : b.type = "text";
            b.socket.onopen = function(a) {
                if (typeof b.onopen === "function") b.onopen(a)
            };
            b.socket.onclose = b.socket.onerror = function(a) {
                if (typeof b.onclose ===
                    "function") b.onclose(a);
                b.socket = void 0
            };
            b.socket.onmessage = function(a) {
                if (typeof b.onmessage === "function") b.onmessage(a.data)
            }
        };
        holder.linear.transport.websocket.prototype.disconnect = function() {
            this.socket.close()
        };
        holder.linear.transport.websocket.prototype.send = function(a) {
            this.socket.send(a)
        };
        holder.linear.jsonp = {
            load: function(a, b, f) {
                var h = document.createElement("iframe");
                h.style.display = "none";
                document.body.appendChild(h);
                var d = h.contentWindow.document,
                    j = !1;
                h[h.readyState ? "onreadystatechange" : "onload"] = function() {
                    this.readyState &&
                    "complete" != this.readyState || j || (j = !0, d.x ? "function" === typeof b && b.apply(this, d.x) : "function" === typeof f && f(), setTimeout(function() {
                        try {
                            h.parentNode.removeChild(h)
                        } catch (a) {}
                    }, 0))
                };
                a = a + (0 > a.indexOf("?") ? "?" : "&") + "f=cb&" + (new Date).getTime();
                d.write('<script>function cb(){document.x=arguments}<\/script><script src="' + a + '"><\/script>');
                d.close();
                return h
            },
            abort: function(a) {
                a && a.parentNode && a.parentNode.removeChild(a)
            }
        };
        holder.linear.transport.polling = function(a, c, f, h, d) {
            this.type = "text";
            this.url = a;
            this.channel =
                c;
            this.options = f || {};
            this.seq = 0;
            this.sid = void 0;
            var j = this,
                k = "?c=connect&ch=" + this.channel;
            j.state = "connecting";
            holder.linear.jsonp.load(this.url + k, function(a) {
                j.sid = a.sid;
                "connecting" !== j.state ? (k = "?c=disconnect&sid=" + j.sid, holder.linear.jsonp.load(j.url + k)) : (j.dopoll(), "function" === typeof h && h())
            }, d)
        };
        holder.linear.transport.polling.prototype.disconnect = function() {
            var a = "?c=disconnect&sid=" + this.sid;
            if ("disconnecting" !== this.state && (this.state = "disconnecting", this.intervaltimer && clearTimeout(this.intervaltimer),
                    this.seq = this.intervaltimer = 0, void 0 !== this.sid && holder.linear.jsonp.load(this.url + a), this.sid = void 0, "function" === typeof this.onclose)) this.onclose()
        };
        holder.linear.transport.polling.prototype.send = function(a) {
            function b(a, d) {
                if (d.confirmed) try {
                    a.parentNode.removeChild(a), d.parentNode.removeChild(d)
                } catch (h) {} else d.confirmed = !0, a.submit(), setTimeout(function() {
                    b(a, d)
                }, j)
            }
            var f, h, d, j = this.options.gc || 3E3;
            void 0 === this.sid || "disconnecting" === this.state || (f = document.createElement("form"), f.style.display = "none",
                f.action = this.url, f.method = "POST", f.target = "ifr" + this.seq, document.body.appendChild(f), h = document.createElement("input"), h.type = "text", h.name = "sid", h.value = this.sid, f.appendChild(h), h = document.createElement("input"), h.type = "text", h.name = "data", h.value = a, f.appendChild(h), d = document.createElement("iframe"), d.style.display = "none", d.name = "ifr" + this.seq++, d.src = "about:blank", d.onload = function() {
                b(f, d)
            }, document.all && (d.onreadystatechange = function() {
                "complete" === this.readyState && (d.contentWindow.name = d.name,
                    b(f, d))
            }), document.body.appendChild(d))
        };
        holder.linear.transport.polling.prototype.dopoll = function() {
            function a(a) {
                if (a && "function" === typeof f.onmessage) f.onmessage(a);
                f.intervaltimer = setTimeout(function() {
                    f.dopoll()
                }, h)
            }

            function c() {
                f.disconnect()
            }
            var f = this,
                h, d = "?c=poll&sid=" + this.sid;
            void 0 === this.sid || "disconnecting" === this.state || (h = f.options ? f.options.interval || 250 : 250, holder.linear.jsonp.load(this.url + d, a, c))
        };
        holder.linear.client = function(a) {
            var c = this,
                f, h;
            c.version = "2.0.6";
            if ("function" !== typeof c) {
                for (var d in a) "protocol" ===
                d.toLowerCase() && (f = a[d]), "transports" === d.toLowerCase() && (h = a[d]);
                f = f ? f : "linear";
                try {
                    c.protocol = new holder.linear.protocol[f]
                } catch (j) {
                    console && console.log("protocol: " + f + " is not implemented."), c.protocol = new holder.linear.protocol.linear
                }
                c.transport = new holder.linear.transport;
                c.transport.onopen = function(a) {
                    c._onopen(a)
                };
                c.transport.onclose = function(a) {
                    c._onclose(a)
                };
                c.transport.onmessage = function(a) {
                    c._onmessage(a)
                };
                c.transport.entry = {};
                a = Object.prototype.toString.call(h);
                if ("[object String]" === a) {
                    if (a = holder.linear.transport.create({
                            type: h
                        })) c.transport.entry[a.type] =
                        a.entry
                } else if ("[object Array]" === a) {
                    f = 0;
                    for (d = h.length; f < d; f++)
                        if (a = "string" === typeof h[f] ? holder.linear.transport.create({
                                    type: h[f]
                                }) : holder.linear.transport.create(h[f])) c.transport.entry[a.type] = a.entry, a = void 0
                } else if (void 0 !== h && "[object Object]" === a) {
                    if (a = holder.linear.transport.create(h)) c.transport.entry[a.type] = a.entry
                } else a = holder.linear.transport.create({
                    type: "websocket"
                }), c.transport.entry[a.type] = a.entry, a = holder.linear.transport.create({
                    type: "polling"
                }), c.transport.entry[a.type] = a.entry;
                return c
            }
        };
        holder.linear.client.prototype.state = function() {
                return this.transport.state
            };
        holder.linear.client.prototype.connect = function(a) {
            "function" === typeof this.transport.connect && this.transport.connect(a)
        };
        holder.linear.client.prototype.onconnect = function(a) {
            "function" === typeof a && (this.onconnect = a)
        };
        holder.linear.client.prototype.disconnect = function() {
            "function" === typeof this.transport.disconnect && this.transport.disconnect()
        };
        holder.linear.client.prototype.ondisconnect = function(a) {
            "function" === typeof a && (this.ondisconnect = a)
        };
        holder.linear.client.prototype.request = function(a) {
                var b;
                if ("function" === typeof this.protocol.request) {
                    if ("disconnected" === this.transport.state || "disconnecting" === this.transport.state) return -1;
                    try {
                        b = this.protocol.request(a)
                    } catch (f) {
                        return -1
                    }
                    if (!b) return -1;
                    this.transport.send(b.data)
                } else return -1;
                return b.id
            };
        holder.linear.client.prototype.onresponse = function(a) {
            "function" === typeof a && (this.onresponse = a)
        };
        holder.linear.client.prototype.notify = function(a) {
            var b;
            if ("function" === typeof this.protocol.notify) {
                if ("disconnected" === this.transport.state ||
                    "disconnecting" === this.transport.state) return !1;
                try {
                    b = this.protocol.notify(a)
                } catch (f) {
                    return !1
                }
                if (!b) return !1;
                this.transport.send(b)
            } else return !1;
            return !0
        };
        holder.linear.client.prototype.onnotify = function(a) {
            "function" === typeof a && (this.onnotify = a)
        };
        holder.linear.client.prototype._onopen = function() {
            var a;
            this.hasOwnProperty("onconnect") && "function" === typeof this.onconnect && (document ? "createEvent" in document ? (a = document.createEvent("Event"), a.initEvent("connected", !0, !0)) : "createEventObject" in document ? (a =
                            document.createEventObject(), a.type = "connected") : a = {
                            type: "connected"
                        } : a = {
                    type: "connected"
                }, this.onconnect(a))
        };
        holder.linear.client.prototype._onclose = function() {
            var a;
            this.protocol.reset();
            this.hasOwnProperty("ondisconnect") && "function" === typeof this.ondisconnect && (document ? "createEvent" in document ? (a = document.createEvent("Event"), a.initEvent("disconnected", !0, !0)) : "createEventObject" in document ? (a = document.createEventObject(), a.type = "disconnected") : a = {
                            type: "disconnected"
                        } : a = {
                    type: "disconnected"
                }, this.ondisconnect(a))
        };
        holder.linear.client.prototype._onmessage = function(a) {
            for (var a = this.protocol.onmessage(a), b = 0, f = a.length; b < f; b++) "response" === a[b].type ? this.hasOwnProperty("onresponse") && "function" === typeof this.onresponse && this.onresponse.call(this, a[b].data) : "notify" === a[b].type && this.hasOwnProperty("onnotify") && "function" === typeof this.onnotify && this.onnotify.call(this, a[b].data)
        }
    }

    function createMsgpack(holder) {
        function a(a) {
            this._n = a
        }

        function c(a) {
            l = "string" === typeof a ? j(a) : a;
            e = -1;
            return h()
        }

        function f(b, i, d) {
            var c, g, e;
            if (null == i) b.push(192);
            else if (!1 === i) b.push(194);
            else if (!0 === i) b.push(195);
            else switch (typeof i) {
                    case "number":
                        i !== i ? b.push(203, 255, 255, 255, 255, 255, 255, 255, 255) : Infinity === i ? b.push(203, 127, 240, 0, 0, 0, 0, 0, 0) : Math.floor(i) === i ? 0 > i ? -32 <= i ? b.push(224 + i + 32) : -128 < i ? b.push(208, i + 256) : -32768 < i ? (i += 65536, b.push(209, i >> 8, i & 255)) : -2147483648 < i ? (i += 4294967296, b.push(210, i >>>
                                                            24, i >> 16 & 255, i >> 8 & 255, i & 255)) : (g = Math.floor(i / 4294967296), i &= 4294967295, b.push(211, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255)) : 128 > i ? b.push(i) : 256 > i ? b.push(204, i) : 65536 > i ? b.push(205, i >> 8, i & 255) : 4294967296 > i ? b.push(206, i >>> 24, i >> 16 & 255, i >> 8 & 255, i & 255) : (g = Math.floor(i / 4294967296), i &= 4294967295, b.push(207, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255)) : ((g = 0 > i) && (i *= -1), e = Math.log(i) / 0.6931471805599453 + 1023 | 0, d = i * Math.pow(2, 1075 - e), i = d & 4294967295, g &&
                                    (e |= 2048), g = d / 4294967296 & 1048575 | e << 20, b.push(203, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255));
                        break;
                    case "string":
                        c = i.length;
                        e = b.length;
                        b.push(0);
                        for (g = 0; g < c; ++g) d = i.charCodeAt(g), 128 > d ? b.push(d & 127) : 2048 > d ? b.push(d >>> 6 & 31 | 192, d & 63 | 128) : 65536 > d && b.push(d >>> 12 & 15 | 224, d >>> 6 & 63 | 128, d & 63 | 128);
                        c = b.length - e - 1;
                        32 > c ? b[e] = 160 + c : 65536 > c ? b.splice(e, 1, 218, c >> 8, c & 255) : 4294967296 > c && b.splice(e, 1, 219, c >>> 24, c >> 16 & 255, c >> 8 & 255, c & 255);
                        break;
                    default:
                        if (++d >= p) return o = 1, [];
                        if (q(i)) {
                            c = i.length;
                            16 > c ? b.push(144 + c) : 65536 > c ? b.push(220, c >> 8, c & 255) : 4294967296 > c && b.push(221, c >>> 24, c >> 16 & 255, c >> 8 & 255, c & 255);
                            for (g = 0; g < c; ++g) f(b, i[g], d)
                        } else if (i instanceof a) d = i.valueOf(), (g = 0 > d) && (d *= -1), e = Math.log(d) / 0.6931471805599453 + 1023 | 0, d *= Math.pow(2, 1075 - e), i = d & 4294967295, g && (e |= 2048), g = d / 4294967296 & 1048575 | e << 20, b.push(203, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255);
                        else {
                            e = b.length;
                            b.push(0);
                            c = 0;
                            for (g in i) ++c, f(b, g, d), f(b, i[g], d);
                            16 > c ? b[e] = 128 + c : 65536 > c ? b.splice(e, 1, 222, c >>
                                        8, c & 255) : 4294967296 > c && b.splice(e, 1, 223, c >>> 24, c >> 16 & 255, c >> 8 & 255, c & 255)
                        }
                }
            return b
        }

        function h() {
            var a, b, c;
            b = 0;
            var f, g;
            g = l;
            c = g[++e];
            a = g.length;
            if (224 <= c) return c - 256;
            if (192 > c) {
                if (128 > c) return c;
                144 > c ? (b = c - 128, c = 128) : 160 > c ? (b = c - 144, c = 144) : (b = c - 160, c = 160)
            }
            switch (c) {
                case 192:
                    return null;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 202:
                    if (a < e + 4 + 1) break;
                    b = 16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                    a = b >> 23 & 255;
                    f = b & 8388607;
                    return !b || 2147483648 === b ? 0 : 255 === a ? f ? NaN : Infinity : (b & 2147483648 ? -1 : 1) * (f | 8388608) *
                            Math.pow(2, a - 127 - 23);
                case 203:
                    if (a < e + 8 + 1) break;
                    b = 16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                    c = b & 2147483648;
                    a = b >> 20 & 2047;
                    f = b & 1048575;
                    if (!b || 2147483648 === b) return e += 4, 0;
                    if (2047 === a) return e += 4, f ? NaN : Infinity;
                    b = 16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                    return (c ? -1 : 1) * ((f | 1048576) * Math.pow(2, a - 1023 - 20) + b * Math.pow(2, a - 1023 - 52));
                case 207:
                    if (a < e + 8 + 1) break;
                    b = 16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                    return 4294967296 * b + 16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                case 206:
                    if (a < e + 4 + 1) break;
                    b += 16777216 * g[++e] + (g[++e] << 16);
                case 205:
                    if (a < e + 2 + 1) break;
                    b += g[++e] << 8;
                case 204:
                    if (a < e + 1 + 1) break;
                    return b + g[++e];
                case 211:
                    if (a < e + 8 + 1) break;
                    b = g[++e];
                    return b & 128 ? -1 * (72057594037927936 * (b ^ 255) + 281474976710656 * (g[++e] ^ 255) + 1099511627776 * (g[++e] ^ 255) + 4294967296 * (g[++e] ^ 255) + 16777216 * (g[++e] ^ 255) + 65536 * (g[++e] ^ 255) + 256 * (g[++e] ^ 255) + (g[++e] ^ 255) + 1) : 72057594037927936 * b + 281474976710656 * g[++e] + 1099511627776 * g[++e] + 4294967296 * g[++e] + 16777216 * g[++e] + 65536 * g[++e] + 256 * g[++e] + g[++e];
                case 210:
                    if (a < e + 4 + 1) break;
                    b =
                        16777216 * g[++e] + (g[++e] << 16) + (g[++e] << 8) + g[++e];
                    return 2147483648 > b ? b : b - 4294967296;
                case 209:
                    if (a < e + 2 + 1) break;
                    b = (g[++e] << 8) + g[++e];
                    return 32768 > b ? b : b - 65536;
                case 208:
                    if (a < e + 1 + 1) break;
                    b = g[++e];
                    return 128 > b ? b : b - 256;
                case 219:
                    if (a < e + 4 + 1) break;
                    b += 16777216 * g[++e] + (g[++e] << 16);
                case 218:
                    if (a < e + 2 + 1) break;
                    b += (g[++e] << 8) + g[++e];
                case 160:
                    if (a < e + b + 1) break;
                    f = [];
                    a = e;
                    for (b = a + b; a < b;) c = g[++a], 240 <= c ? (c = ((c & 3) << 18 | (g[++a] & 63) << 12 | (g[++a] & 63) << 6 | g[++a] & 63) - 65536, f.push(55296 + (c >> 10)), f.push(56320 + (c & 1023))) : f.push(128 >
                        c ? c : 224 > c ? (c & 31) << 6 | g[++a] & 63 : (c & 15) << 12 | (g[++a] & 63) << 6 | g[++a] & 63);
                    e = a;
                    return 10240 > f.length ? n.apply(null, f) : d(f);
                case 223:
                    if (a < e + 4 + 1) break;
                    b += 16777216 * g[++e] + (g[++e] << 16);
                case 222:
                    if (a < e + 2 + 1) break;
                    b += (g[++e] << 8) + g[++e];
                case 128:
                    for (g = {}; b--;) {
                        if (a < e + 1 + 1) return;
                        c = h();
                        if (void 0 === c) return;
                        f = c;
                        c = h();
                        if (void 0 === c) return;
                        g[f] = c
                    }
                    return g;
                case 221:
                    if (a < e + 4 + 1) break;
                    b += 16777216 * g[++e] + (g[++e] << 16);
                case 220:
                    if (a < e + 2 + 1) break;
                    b += (g[++e] << 8) + g[++e];
                case 144:
                    for (f = []; b--;) {
                        c = h();
                        if (void 0 === c) return;
                        f.push(c)
                    }
                    return f
            }
        }

        function d(a) {
            try {
                var b = n.apply(this, a);
                if (a.length != b.length) throw "toString failed";
                return b
            } catch (c) {}
            for (var b = [], d = 0, e = a.length, f = m; d < e; ++d) b[d] = f[a[d]];
            return b.join("")
        }

        function j(a) {
            var b = [],
                c = k,
                d = a.split(""),
                e = -1,
                f;
            f = d.length;
            for (a = f % 8; a--;) ++e, b[e] = c[d[e]];
            for (a = f >> 3; a--;) b.push(c[d[++e]], c[d[++e]], c[d[++e]], c[d[++e]], c[d[++e]], c[d[++e]], c[d[++e]], c[d[++e]]);
            return b
        }

        holder.msgpack = {
            todouble: a,
            unpacker: function() {
                var a = {
                    _chunk: [],
                    _cidx: 0,
                    feed: function(b) {
                        b = "string" === typeof b ? j(b) : b;
                        a._chunk =
                            a._chunk.concat(b)
                    },
                    unpack: function() {
                        var b = c(a._chunk);
                        if (void 0 !== b) return a._cidx = e + 1, a._chunk = a._chunk.slice(a._cidx), b
                    },
                    refresh: function() {
                        a._chunk = [];
                        a._cidx = 0
                    }
                };
                return a
            },
            pack: function(a, b) {
                o = 0;
                var c = f([], a, 0);
                return o ? !1 : b ? d(c) : c
            },
            unpack: c
        };
        var k = {},
            m = {},
            l = [],
            e = 0,
            o = 0,
            q = Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
            n = String.fromCharCode,
            p = 512;
        a.prototype = new Number;
        a.prototype.valueOf = function() {
            return this._n
        };
        a.prototype.toString = function() {
            return this._n.toString()
        };
        (function() {
            for (var a = 0, b; 256 > a; ++a) b = n(a), k[b] = a, m[a] = b;
            for (a = 128; 256 > a; ++a) k[n(63232 + a)] = a
        })()
    }

})();
