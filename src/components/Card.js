import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

function Card ({ avatar_url, formattedUsername, html_url, totalStars, followers, totalRepositories }) {
  return (
    <div className='card'>
      <div className='card__picture'>
        <img src={avatar_url} alt='Github username profile' />
      </div>

      <div className='card__profile-container'>
        <div className='card__profile-block'>
          <span className='card__profile-name'>
            <a href={html_url} target='_blank' rel='noopener noreferrer'>
              <span className='card__highlighted-part'>
                {formattedUsername.highlightedPart}
              </span>

              <span className='card__remaining-part'>
                {formattedUsername.remainingPart}
              </span>
            </a>
          </span>
        </div>

        <div className='card__profile-block'>
          <span className='card__profile-star-icon' />

          <div className='card__profile-repository-block'>
            <span className='card__profile-star-number'>
              {
                Intl.NumberFormat('fr-FR').format(totalStars.toFixed(1))
              }
            </span>

            <span className='card__profile-separator'>&nbsp;-&nbsp;</span>

            <span className='card__profile-repositories'>
              {totalRepositories} <FormattedMessage id={'CARD.REPOSITORIES'} />
            </span>
          </div>
        </div>

        <div className='card__profile-block'>
          <span className='card__profile-follower-label'>
            Suivi par:&nbsp;
          </span>

          {
            followers.length > 0 ? (
            <>
              <div className='card__profile-follower'>
                {
                  followers.map((follower) => (
                    <span
                      key={follower.id}
                      className='card__profile-follower-icon'
                    >
                      <img src={follower.avatar_url} alt='follower-icon' />
                    </span>
                  ))
                }
              </div>
              <span className='card__profile-follower-count'>&nbsp;+{followers.length}</span>
            </>
            ) : (
              <div className='card__profile-follower'>
              Personne :(
              </div>
            )
          }

        </div>

      </div>
    </div>
  )
}

Card.propTypes = {
  avatar_url: PropTypes.string,
  login: PropTypes.string,
  totalStars: PropTypes.number,
  formattedUsername: PropTypes.object.isRequired,
  hmtl_url: PropTypes.string,
  followers: PropTypes.arrayOf(PropTypes.object)
}

Card.defaultProps = {
  login: 'Unknown',
  totalStars: 0,
  followers: [],
  avatar_url: 'https://img.icons8.com/ios/50/000000/gender-neutral-user.png',
  html_url: ''
}

export default Card
