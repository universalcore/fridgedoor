from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('total_users', '/totalusers/')
    config.add_route('pageviews_weekly', '/pageviews/weekly/')
    config.add_route('pageviews_monthly', '/pageviews/monthly/')
    config.add_route('pageviews', '/pageviews/')
    config.add_route('devices', '/devices/')
    config.add_route('moreinfo', '/moreinfo/')
    config.scan()
    return config.make_wsgi_app()