Rails.application.routes.draw do
  resources :users
  resources :dogs
  resources :dog_parks
  resources :check_ins
  resources :reviews
  get 'dog_parks/:id/check_ins', to: 'dog_parks#check_ins'
  get 'dog_parks/:id/reviews', to: 'dog_parks#reviews'
end
