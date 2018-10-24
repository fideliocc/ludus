const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

// Load Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};
  
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'lastname', 'date']) // Trae info del ref: "user"
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      // Get fields in request body
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.country) profileFields.country = req.body.country;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.birthdate) profileFields.birthdate = req.body.birthdate;
      if (req.body.genre) profileFields.genre = req.body.genre;
      if (req.body.heigth) profileFields.heigth = req.body.heigth;
      if (req.body.currentweigth) profileFields.currentweigth = req.body.currentweigth;
      if (req.body.desiredweigth) profileFields.desiredweigth = req.body.desiredweigth;
      if (req.body.activity) profileFields.activity = req.body.activity;
      if (req.body.workoutinweek) profileFields.workoutinweek = req.body.workoutinweek;
      if (req.body.workouttime) profileFields.workouttime = req.body.workouttime;
      if (req.body.goal) profileFields.goal = req.body.goal;
      if (req.body.qty) profileFields.qty = req.body.qty;

      //if (req.body.bio) profileFields.bio = req.body.bio;

  
      // Social
      profileFields.social = {};
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }
      });
    }
  );
  
// @route   DELETE api/profile
// @desc    Delete user and profile (!!!)
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);


module.exports = router;