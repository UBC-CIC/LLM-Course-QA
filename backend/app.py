from . import create_app
import os

app = create_app()

if __name__ == '__main__':
    if os.environ.get('FLASK_ENV') == 'dev':
        app.run(debug=True, threaded=True)
    else:
        app.run(host='0.0.0.0', port=5000, threaded=True)