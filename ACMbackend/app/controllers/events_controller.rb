class EventsController < ApplicationController
  def index
    @events = Event.order(start_time: :desc)

    render json: @events.as_json(include: :sub_events), status: :ok
  end

  def show
    @event = Event.find(params[:id])
    render json: @event.as_json(include: :sub_events), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Event not found"}, status: :not_found
  end
end