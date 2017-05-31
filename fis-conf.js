"use strict";

var media = fis.project.currentMedia();
var cdn = media.replace("prod_", "");

fis.set("project.md5Connector", "-");

fis.set("project.ignore", fis.get("project.ignore").concat([
  "bower.json",
  "package.json",
  "CNAME",
  ".*",
  "**/*.yml",
  "bin/**",
  "controllers/**",
  "models/**",
  "routes/**",
  "scripts/**",
  "vendors/**",
  "static/**"
]));

fis.hook("commonjs");

fis
  .match("_*.*", {
    release: false
  }, true)
  .match("*.{scss,es6}", {
    useMap: false
  })
  .match("*.{css}", {
    useCompile: false,
    release: false
  })
  .match("/static/bower_components/**", {
    useCompile: false,
    release: false
  });

if ( media === "dev" ) {
  fis
    .match("**", {
      deploy: fis.plugin("local-deliver", {to: "."})
    })
    .match("*.scss", {
      rExt: ".css",
      parser: fis.plugin("node-sass"),
      optimizer: fis.plugin("clean-css", {
        keepSpecialComments: 0
      })
    })
    .match("*.pug", {
      rExt: ".html",
      parser: fis.plugin("pug", {
        doctype: "html"
      })
    })
    .match("/assets/stylesheets/(*).scss", {
      release: "static/assets/$1"
    })
    .match("/pages/(*).pug", {
      release: "$1"
    });
}

// if ( media === "dev" ) {
//   var devTarget = "../../../../../target/classes";
//   var deployToCurrent = fis.plugin("local-deliver", {to: "../../"});
//   var deployToTarget = fis.plugin("local-deliver", {to: devTarget});
//   var deployPlugins = [deployToCurrent];
//
//   fis
//     .match("**", {
//       deploy: deployToCurrent
//     })
//     .match("*.{vm,jsp,html,xml,properties}", {
//       useCompile: false,
//       release: false
//     })
//     .match("*.scss", {
//       rExt: ".css",
//       parser: fis.plugin("node-sass")
//     })
//     .match("*.{es6,jsx}", {
//       rExt: ".js",
//       parser: fis.plugin("babel", {
//         comments: false
//       })
//     });
//
//   deployPlugins.push(deployToTarget);
//
//   fis
//     .match("::image", {
//       deploy: deployToTarget
//     })
//     .match("*.{scss,es6,jsx}", {
//       deploy: deployPlugins
//     });
//
//   fis
//     .match("/{assets,views/*}/**.js", {
//       useCompile: false
//     })
//     .match("/{assets,utils,views/*}/*/*.js", {
//       useMap: false,
//       useCompile: true,
//       deploy: deployPlugins
//     })
//     .match("/({assets,utils,views/*}/*)/(*).{scss,es6,js}", {
//       release: "static/admin/$1-$2",
//       isMod: true
//     })
//     .match("/({assets,views/*}/*)/index.{scss,es6,js}", {
//       release: "static/admin/$1",
//       isMod: false
//     })
//     .match("/{assets,utils,views/*}/*/*.js", {
//       rExt: ".js",
//       parser: fis.plugin("babel", {
//         comments: false
//       })
//     })
//     .match("/(utils/*)/index.js", {
//       release: "$1"
//     })
//     .match("/utils/common/index.js", {
//       isMod: false
//     })
//     // 暂时将模块入口包裹成 IIFE
//     .match("/{assets/*,utils/common,views/*/*}/index.{js,es6}", {
//       postprocessor: fis.plugin("jswrapper", {
//         wrapAll : true,
//         template : "(function(){\n${content}\n})();"
//       })
//     });
// }
// else {
//   fis.set("projName", "hummer");
//   fis.set("projVer", "1.0");
//
//   fis
//     .match("**", {
//       release: "$1",
//       domain: "//" + (cdn === "qiniu" ? "img" : "img1") + ".maihaoche.com",
//       deploy: fis.plugin("local-deliver", {to: "../webapp_" + cdn})
//     })
//     .match("::image", {
//       useHash: true
//     })
//     .match("*.{css,js}", {
//       useHash: true
//     })
//     .match("*.css", {
//       optimizer: fis.plugin("clean-css", {
//         keepSpecialComments: 0
//       })
//     })
//     .match("*.js", {
//       optimizer: fis.plugin("uglify-js")
//     })
//     .match("*.png", {
//       optimizer: fis.plugin("png-compressor")
//     })
//     .match("/bower_components/(**)", {
//       useHash: false,
//       release: "/lib/$1"
//     })
//     //.match("/${modulePath}/**.js", {
//     //  isMod: true
//     //})
//     .match("/template/assets/*/reset.css", {
//       preprocessor: function( content, file, settings ) {
//         return content.replace(/(\.\.\/){5}bower\_components/g, "..\/..\/..\/..\/..\/lib");
//       }
//     })
//     .match("/template/({assets,utils})/(**.{css,js,png,jpg,gif})", {
//       release: "/${projName}/${projVer}/c/$1/$2"
//     })
//     .match("/template/views/(**.{css,js,png,jpg,gif})", {
//       release: "/${projName}/${projVer}/p/$1"
//     })
//     .match("/template/{assets/*,utils,views/*/*}/*/*.{scss,es6,js}", {
//       useCompile: false,
//       release: false
//     });
// }
