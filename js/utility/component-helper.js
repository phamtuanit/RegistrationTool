export default {
    loadComponent: (moduleUrl, tmpUrl) => {
        return () =>
            import ('../../components/' + moduleUrl.trim('/')).then((xmodule) => {
                if (!tmpUrl && xmodule.default.templateFile) {
                    tmpUrl = xmodule.default.templateFile.trim('/');
                }
                if (tmpUrl) {
                    return new Promise((resole, reject) => {
                        $.ajax({
                            url: './components/' + tmpUrl,
                        }).done((html) => {
                            console.debug('Component template ' + tmpUrl + ' is loaded.');
                            xmodule.default.template = html;
                            resole(xmodule);
                        }).fail((jqXHR, textStatus) => {
                            console.error('Could not load template', tmpUrl, jqXHR);
                            reject(textStatus + jqXHR);
                        });
                    })
                } else {
                    return xmodule;
                }
            }).catch(function(error) {
                console.error('Could not load component ' + moduleUrl, error);
            });
    }
}