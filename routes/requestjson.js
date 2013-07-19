/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */

var fs = require('fs'),

    readJsonFileSync = function (filepath, encoding)
    {
        'use strict';

        var data = null;

        if (typeof (encoding) === 'undefined')
        {
            encoding = 'utf8';
        }

        try
        {
            data = fs.readFileSync(filepath, encoding);
        }
        catch (e)
        {
            if (e.code === 'ENOENT')
            {
                console.log(filepath + ' not found!');

                data = '[{"error": "json not found"}]';
            }
            else
            {
                throw e;
            }
        }

        return JSON.parse(data);
    };

exports.requestjson = function (req, res)
{
    'use strict';

    var file = readJsonFileSync(__dirname + '../../public/data/test.json');

    res.json(file);
};