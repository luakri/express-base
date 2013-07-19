/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */

var fs = require('fs'),
    $dirArray = [],
    indexSvn = -1,
    indexPhp = -1;

exports.index = function (req, res)
{
    'use strict';

    fs.readdir(__dirname + '../../public/modules/', function (err, files)
    {
        $dirArray = files;

        indexSvn = $dirArray.indexOf('.svn');

        if (indexSvn !== -1)
        {
            $dirArray.splice(indexSvn, 1);
        }

        indexPhp = $dirArray.indexOf('index.php');

        if (indexPhp !== -1)
        {
            $dirArray.splice(indexPhp, 1);
        }

        res.render('index',
            {
                title: 'Express',
                dirArray : $dirArray
            }
        );
    });
};