from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/get_fide_ratings')
def get_fide_ratings():
    url = "https://ratings.fide.com/profile/651010240"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        standard_div = soup.find('div', {'class': 'profile-top-rating-data profile-top-rating-data_gray'})
        rapid_div = soup.find('div', {'class': 'profile-top-rating-data profile-top-rating-data_red'})
        blitz_div = soup.find('div', {'class': 'profile-top-rating-data profile-top-rating-data_blue'})

        standard_rating = standard_div.get_text(strip=True).replace("std", "").strip() if standard_div else "Non trouvé"
        rapid_rating = rapid_div.get_text(strip=True).replace("rapid", "").strip() if rapid_div else "Non trouvé"
        blitz_rating = blitz_div.get_text(strip=True).replace("blitz", "").strip() if blitz_div else "Non trouvé"

        return jsonify({
            'standard': standard_rating,
            'rapid': rapid_rating,
            'blitz': blitz_rating
        })
    else:
        return jsonify({
            'error': 'Erreur lors de la récupération des données.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
