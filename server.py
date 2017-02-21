from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def show_map():
    """show the map"""

    return render_template("map.html")


if __name__ == "__main__":

    app.debug = True
    app.run(host="0.0.0.0", port=5010)